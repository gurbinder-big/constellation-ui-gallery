import { useRef, useState, useEffect, useCallback, useMemo } from 'react';
import { Card, CardContent, Flex, Button, Input, withConfiguration} from '@pega/cosmos-react-core';
import type { PConnFieldProps } from './PConnProps';
import StyledPegaExtensionsCameraCaptureWrapper from './styles';

function PegaExtensionsCameraCapture(props: PConnFieldProps) {
  const { getPConnect } = props;

  const [attachmentFieldName, setAttachmentFieldName] = useState('');
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [cameraActive, setCameraActive] = useState(false);
  const [capturedImg, setCapturedImg] = useState<string | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [videoDims, setVideoDims] = useState<{ width: number; height: number } | null>(null);
  const [containerWidth, setContainerWidth] = useState<number>(0);
  const context = getPConnect().getContextName();

  const generateUniqueID = () => '_' + Math.random().toString(36).substr(2, 9);

  const caseInfo = useMemo(() => {
    return (
      getPConnect().getValue((window as any).PCore.getConstants().CASE_INFO.CASE_INFO) || {}
    );
  }, [getPConnect]);

  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach((t) => t.stop());
      }
    };
  }, [stream]);

  useEffect(() => {
    if (cameraActive && videoRef.current && stream) {
      videoRef.current.srcObject = stream;
      videoRef.current.play().catch((err) => {
        console.warn('Video play error (may be autoplay blocked):', err);
      });
    }
  }, [cameraActive, stream]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const ro = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const cr = entry.contentRect;
        if (cr.width) {
          setContainerWidth(Math.round(cr.width));
        }
      }
    });

    ro.observe(el);
    setContainerWidth(Math.round(el.getBoundingClientRect().width));
    return () => ro.disconnect();
  }, []);

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
      setCapturedImg(null);
      setStream(mediaStream);
      setCameraActive(true);
    } catch (err) {
      console.error('Camera access error:', err);
    }
  };

  const stopCamera = useCallback(() => {
    if (stream) {
      stream.getTracks().forEach((t) => t.stop());
    }
    setStream(null);
    setCameraActive(false);
  }, [stream]);

  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);


  const handleLoadedMetadata = () => {
    const v = videoRef.current;
    if (v) {
      const width = v.videoWidth;
      const height = v.videoHeight;
      if (width && height) {
        setVideoDims({ width, height });
      }
    }
  };

  const captureImage = () => {
    const videoElement = videoRef.current;
    const canvasElement = canvasRef.current;
    if (!videoElement || !canvasElement) return;

    const videoWidth = videoElement.videoWidth || containerWidth;
    const videoHeight = videoElement.videoHeight
      || (videoDims ? Math.round(videoWidth * (videoDims.height / videoDims.width)) : undefined);

    if (!videoWidth || !videoHeight) {
      console.error('Cannot determine natural video dimensions for capture', { videoWidth, videoHeight });
      return;
    }
    canvasElement.width = videoWidth;
    canvasElement.height = videoHeight;

    const canvasContext = canvasElement.getContext('2d');
    if (!canvasContext) {
      console.error('Cannot get canvas context');
      return;
    }
    canvasContext.drawImage(videoElement, 0, 0, canvasElement.width, canvasElement.height);
    const capturedImageData = canvasElement.toDataURL('image/png');
    setCapturedImg(capturedImageData);
    stopCamera();
  };


  const handleRetake = () => {
    setCapturedImg(null);
    startCamera();
  };

  const base64ToFile = (base64String: string, fileName: string) => {
    const [metadata, base64Data] = base64String.split(',');
    const mimeMatch = metadata.match(/:(.*?);/);
    const mimeType = mimeMatch ? mimeMatch[1] : 'image/png';
    const binaryString = atob(base64Data);
    const byteLength = binaryString.length;
    const byteArray = new Uint8Array(byteLength);
    for (let i = 0; i < byteLength; i++) {
      byteArray[i] = binaryString.charCodeAt(i);
    }
    return new File([byteArray], fileName, { type: mimeType });
  };

  const onUploadProgress = (e: any) => {
    console.log(e);
  };

  const errorHandler = (isRequestCancelled: any) => {
    return (error: any) => {
      if (!isRequestCancelled(error)) {
        console.error(`Upload failed: ${error.message}`);
      }
    };
  };

  const linkFile = async (id: any, name: any) => {
    const file = {
      type: 'File',
      category: 'File',
      attachmentFieldName: 'File',
      fileType: 'PNG',
      name: attachmentFieldName || name,
      ID: id
    };

    await PCore.getAttachmentUtils().linkAttachmentsToCase(
      caseInfo?.ID,
      [file],
      'File',
      context
    );
    stopCamera();
    setCapturedImg(null);
    setStream(null);
    setCameraActive(false);
  };

  const handleUpload = async () => {
    if (!capturedImg) return;

    const id = generateUniqueID();
    const file = base64ToFile(capturedImg, `camera_capture_${id}.png`);
    (file as any).ID = id;

    console.log(file);

    const res = await PCore.getAttachmentUtils().uploadAttachment(
      file as any,
      onUploadProgress,
      errorHandler,
      context
    );
    linkFile((res as any).ID, id);
  };

  return (
    <StyledPegaExtensionsCameraCaptureWrapper>
      <Card>
        <CardContent>
          <Flex container={{ direction: 'column', gap: 2 }}>
            {!cameraActive && !capturedImg && (
              <Flex container={{ gap: 2 }}>
                <Button variant="primary" onClick={startCamera} className='camera-buttons'>
                  Capture with Camera
                </Button>
                <Button variant="primary" onClick={stopCamera} className='camera-buttons'>
                  Turn off Camera
                </Button>
              </Flex>
            )}

            {cameraActive && !capturedImg && (
              <>
                <div ref={containerRef} className='camera-container'>
                  <video className='camera-video' ref={videoRef} autoPlay playsInline muted onLoadedMetadata={handleLoadedMetadata} />
                </div>
                <Flex container={{ gap: 2 }}>
                  <Button variant="primary" onClick={captureImage} className='camera-buttons'>
                    Capture
                  </Button>
                  <Button variant="primary" onClick={stopCamera} className='camera-buttons'>
                    Turn off Camera
                  </Button>
                </Flex>
                <canvas ref={canvasRef} style={{ display: 'none' }} />
              </>
            )}

            {capturedImg && (
              <>
                <div className='captured-wrapper'>
                  <img className='captured-image' src={capturedImg} alt="Captured" />
                </div>
                <Flex container={{ gap: 2 }}>
                  <Input
                    type='text'
                    placeholder='Enter File Name (Optional)'
                    style={{ width: "200px" }}
                    onChange={(e) => {
                      setAttachmentFieldName(e.currentTarget.value);
                    }}
                  />
                  <Button variant="primary" onClick={handleUpload} className='camera-buttons'>
                    Save as Attachment
                  </Button>
                  <Button variant="primary" onClick={handleRetake} className='camera-buttons'>
                    Retake
                  </Button>
                  <Button variant="primary" onClick={stopCamera} className='camera-buttons'>
                    Turn off Camera
                  </Button>
                </Flex>
              </>
            )}
          </Flex>
        </CardContent>
      </Card>
    </StyledPegaExtensionsCameraCaptureWrapper>
  );
}

export default withConfiguration(PegaExtensionsCameraCapture);
