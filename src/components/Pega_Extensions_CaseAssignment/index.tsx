import { useState, useMemo } from 'react';
import { Card, CardContent, Flex, Button, withConfiguration } from '@pega/cosmos-react-core';
import StyledPegaExtensionsCameraCaptureWrapper from './styles';
import '../shared/create-nonce';

type Props = {
  getPConnect: any;
};

export const PegaExtensionsCaseAssignment = ({ getPConnect }: Props) => {
  const [file, setFile] = useState<File | null>(null);

  const pConn = getPConnect();
  const context = pConn.getContextName();

  const caseInfo = useMemo(() => {
    return pConn.getValue((window as any).PCore.getConstants().CASE_INFO.CASE_INFO) || {};
  }, [pConn]);

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files?.[0] || null);
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

  const uploadAndLink = async () => {
    if (!file) return;

    try {
      const res = await (window as any).PCore.getAttachmentUtils().uploadAttachment(
        file as any,
        onUploadProgress,
        errorHandler,
        context
      );

      if (!res?.ID) throw new Error('Upload failed');

      await (window as any).PCore.getAttachmentUtils().linkAttachmentsToCase(
        caseInfo?.ID,
        [
          {
            type: 'File',
            category: 'File',
            attachmentFieldName: 'File',
            name: file.name,
            ID: res.ID
          }
        ],
        'File',
        context
      );
    } catch (e) {
      console.error('Attachment upload failed', e);
    }
  };

  return (
    <StyledPegaExtensionsCameraCaptureWrapper>
      <Card>
        <CardContent>
          <Flex container={{ justify: 'start', pad: 2 }}>
            <input type="file" onChange={onFileChange} />
            <Button
              variant="primary"
              onClick={uploadAndLink}
              disabled={!file}
            >
              Submit File
            </Button>
          </Flex>
        </CardContent>
      </Card>
    </StyledPegaExtensionsCameraCaptureWrapper>
  );
};

export default withConfiguration(PegaExtensionsCaseAssignment);
