import { withConfiguration, Flex } from '@pega/cosmos-react-core';
import Markdown from 'react-markdown';
import parse from 'html-react-parser';
import '../create-nonce';

type ActionableNewButtonProps = {
  value: string;
  localAction: string;
  getPConnect: any;
};

const html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document Comparison Viewer</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            margin: 0;
            padding: 20px;
            background-color: #f5f7fa;
            color: #333;
        }
        .header {
            background-color: #1565c0;
            color: white;
            padding: 20px;
            text-align: center;
            margin-bottom: 30px;
            border-radius: 5px;
            box-shadow: 0 2px 5px rgba(0,0,0,0.1);
        }
        .comparison-container {
            background: white;
            border-radius: 5px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            margin-bottom: 30px;
            overflow: hidden;
        }
        .section-header {
            background-color: #f1f5f9;
            padding: 15px;
            border-bottom: 1px solid #e0e0e0;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .section-content {
            display: flex;
            flex-wrap: wrap;
        }
        .old-section, .new-section {
            flex: 1;
            min-width: 300px;
            padding: 20px;
            border-right: 1px solid #e0e0e0;
        }
        .new-section {
            border-right: none;
            background-color: #fafafa;
        }
        .section-title {
            font-weight: bold;
            margin-bottom: 10px;
        }
        .explain-btn {
            background-color: #4caf50;
            color: white;
            border: none;
            padding: 8px 15px;
            border-radius: 4px;
            cursor: pointer;
            font-size: 14px;
            transition: background-color 0.3s;
        }
        .explain-btn:hover {
            background-color: #388e3c;
        }
        .explanation {
            background-color: #e8f5e9;
            padding: 15px;
            border-radius: 4px;
            margin-top: 15px;
            display: none;
        }
        ins {
            background-color: #e8f5e9;
            text-decoration: none;
            padding: 2px 0;
        }
        del {
            background-color: #ffebee;
            text-decoration: line-through;
            padding: 2px 0;
        }
        .new-sections-header {
            background-color: #1565c0;
            color: white;
            padding: 15px;
            margin-top: 40px;
            margin-bottom: 20px;
            border-radius: 5px;
        }
        .no-new-sections {
            background-color: #e3f2fd;
            padding: 15px;
            border-radius: 5px;
            text-align: center;
            margin-top: 20px;
        }
        @media (max-width: 768px) {
            .section-content {
                flex-direction: column;
            }
            .old-section, .new-section {
                border-right: none;
                border-bottom: 1px solid #e0e0e0;
            }
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>Document Comparison Viewer</h1>
        <p>Compare sections between previous and new document versions</p>
    </div>

    <h2>Comparison Table for Section Pairs</h2>

    <div id="matched-sections">

        <div class="comparison-container">
            <div class="section-header">

            </div>
            <div class="section-content">
                <div class="old-section">
                    <div class="section-title">Previous Section:</div>
                    <div>
                        ## Non-Proportional Reinsurance Treaty\n(hereinafter referred to as the "Treaty")

between
                    </div>
                </div>
                <div class="new-section">
                    <div class="section-title">New Section (Diff):</div>
                    <div>
                        ## Non-Proportional Reinsurance Treaty<br>(hereinafter referred to as the &quot;Treaty&quot;)<br><br>between
                    </div>
                </div>
            </div>
            <div id="explanation-0" class="explanation">
                <strong>AI Explanation:</strong> This section has changed from the previous version. The similarity score is 1.00.
            </div>
        </div>

        <div class="comparison-container">
            <div class="section-header">

            </div>
            <div class="section-content">
                <div class="old-section">
                    <div class="section-title">Previous Section:</div>
                    <div>
                        ## Abc  EMEA P&amp;C S.A, Luxembourg\n(hereinafter referred to as the "Company")

and

The Subscribing Reinsurer

(hereinafter referred to as the "Reinsurer")

The general conditions below, complemented by the relevant Appendix, its clauses and addenda, constitute a legally independent treaty. In case of doubt, the provisions in the Appendix and addenda prevail over the general conditions.
                    </div>
                </div>
                <div class="new-section">
                    <div class="section-title">New Section (Diff):</div>
                    <div>
                        ## Abc  EMEA P&amp;amp;C S.A, Luxembourg<br>(hereinafter referred to as the &quot;Company&quot;)<br><br>and<br><br>The Subscribing Reinsurer<br><br>(hereinafter referred to as the &quot;Reinsurer&quot;)<br><br>The general conditions below, complemented by the relevant Appendix, its clauses and addenda, constitute a legally independent treaty. In case of doubt, the provisions in the Appendix and addenda prevail over the general conditions.
                    </div>
                </div>
            </div>
            <div id="explanation-1" class="explanation">
                <strong>AI Explanation:</strong> This section has changed from the previous version. The similarity score is 1.00.
            </div>
        </div>

        <div class="comparison-container">
            <div class="section-header">

            </div>
            <div class="section-content">
                <div class="old-section">
                    <div class="section-title">Previous Section:</div>
                    <div>
                        ## Article 1\n
                    </div>
                </div>
                <div class="new-section">
                    <div class="section-title">New Section (Diff):</div>
                    <div>
                        ## Article 1
                    </div>
                </div>
            </div>
            <div id="explanation-2" class="explanation">
                <strong>AI Explanation:</strong> This section has changed from the previous version. The similarity score is 1.00.
            </div>
        </div>

        <div class="comparison-container">
            <div class="section-header">

            </div>
            <div class="section-content">
                <div class="old-section">
                    <div class="section-title">Previous Section:</div>
                    <div>
                        ## Subject matter of the Treaty\nInsurance conditions, tariffs and underwriting policies
                    </div>
                </div>
                <div class="new-section">
                    <div class="section-title">New Section (Diff):</div>
                    <div>
                        ## Subject matter of the Treaty<br><del style='background:#ffebee;'>Insurance conditions, tariffs and underwriting policies</del>
                    </div>
                </div>
            </div>
            <div id="explanation-3" class="explanation">
                <strong>AI Explanation:</strong> This section has changed from the previous version. The similarity score is 1.00.
            </div>
        </div>

        <div class="comparison-container">
            <div class="section-header">

            </div>
            <div class="section-content">
                <div class="old-section">
                    <div class="section-title">Previous Section:</div>
                    <div>
                        ## Management and follow-up obligations\n- 1 This Treaty covers all insurance issued by the Company within the insurance lines of business and within the geographical and territorial scope set out in the Appendices to this Treaty.
- 2 The  Company  undertakes  to  cede  this  business  to  the Reinsurer  as  reinsurance.  The  Reinsurer  is  obliged  to  accept such reinsurance.
- 3 This Treaty covers obligatory reinsurance but excludes excessof- loss insurance or reinsurance, participations in pools or any of the exclusions listed in the Appendix.

4 Additional portfolios within the territorial and geographical scope set out in the Appendixes to this Treaty will be added automatically  to  this  Treaty  provided  that  such  portfolios  must comply  with  the  ABC    strategy  as  a  digital  B2B2C  insurance company. If a significant additional portfolio increasing GWP in a country  arises,  ABC    reserves  the  right  to  ask  for  a  special acceptance quotation with stand-alone terms.
                    </div>
                </div>
                <div class="new-section">
                    <div class="section-title">New Section (Diff):</div>
                    <div>
                        ## Management and follow-up obligations<br>- 1 This Treaty covers all insurance issued by the Company within the insurance lines of business and within the geographical and territorial scope set out in the Appendices to this Treaty.<br>- 2 The  Company  undertakes  to  cede  this  business  to  the Reinsurer  as  reinsurance.  The  Reinsurer  is  obliged  to  accept such reinsurance.<br><del style='background:#ffebee;'>- 3 This Treaty covers obligatory reinsurance but excludes excessof- loss insurance or reinsurance, participations in pools or any of the exclusions listed in the Appendix.</del><br><ins style='background:#e8f5e9;'>- 3 This  Treaty  does  not  cover  obligatory  reinsurance,  excess-ofloss insurance or reinsurance, participations in pools nor any of the exclusions listed in the Appendix.</ins><br><br>4 Additional portfolios within the territorial and geographical scope set out in the Appendixes to this Treaty will be added automatically  to  this  Treaty  provided  that  such  portfolios  must comply  with  the  ABC    strategy  as  a  digital  B2B2C  insurance company. If a significant additional portfolio increasing GWP in a country  arises,  ABC    reserves  the  right  to  ask  for  a  special acceptance quotation with stand-alone terms.
                    </div>
                </div>
            </div>
            <div id="explanation-4" class="explanation">
                <strong>AI Explanation:</strong> This section has changed from the previous version. The similarity score is 1.00.
            </div>
        </div>

        <div class="comparison-container">
            <div class="section-header">

            </div>
            <div class="section-content">
                <div class="old-section">
                    <div class="section-title">Previous Section:</div>
                    <div>
                        ## Article 2\n- 1 The Company's general and special conditions of Insurance, tariffs and underwriting guidelines that apply to the insurance covered by this Treaty at the time it is concluded form an integral part of this Treaty.
                    </div>
                </div>
                <div class="new-section">
                    <div class="section-title">New Section (Diff):</div>
                    <div>
                        ## Article 2<br><del style='background:#ffebee;'>- 1 The Company&#x27;s general and special conditions of Insurance, tariffs and underwriting guidelines that apply to the insurance covered by this Treaty at the time it is concluded form an integral part of this Treaty.</del><br><ins style='background:#e8f5e9;'>- 1 The  Company&#x27;s  general  and  special  conditions  of  Insurance, tariffs  and  underwriting  guidelines  that  apply  to  the  insurance covered by this Treaty at the time it is concluded form an integral part of this Treaty.</ins>
                    </div>
                </div>
            </div>
            <div id="explanation-5" class="explanation">
                <strong>AI Explanation:</strong> This section has changed from the previous version. The similarity score is 1.00.
            </div>
        </div>

        <div class="comparison-container">
            <div class="section-header">

            </div>
            <div class="section-content">
                <div class="old-section">
                    <div class="section-title">Previous Section:</div>
                    <div>
                        ## Article 3\n- 1 This Treaty does not restrict the Company's right to conduct the original insurance business. In particular, the Company is authorised to accept, reject or settle claims by way of settlement; the Company shall act in the same way as would an insurer that is not reinsured. The Reinsurer is bound by all actions taken or omissions made by the Company, provided these are carried out with the due care and within the conditions of this Treaty and the original policy. Without the prior approval of the Reinsurer, ex-gratia payments (payments made by the Company for losses not covered under the conditions of the original policy) are not reinsured hereunder.
                    </div>
                </div>
                <div class="new-section">
                    <div class="section-title">New Section (Diff):</div>
                    <div>
                        ## Article 3<br>- 1 This Treaty does not restrict the Company&#x27;s right to conduct the original insurance business. In particular, the Company is authorised to accept, reject or settle claims by way of settlement; the Company shall act in the same way as would an insurer that is not reinsured. The Reinsurer is bound by all actions taken or omissions made by the Company, provided these are carried out with the due care and within the conditions of this Treaty and the original policy. Without the prior approval of the Reinsurer, ex-gratia payments (payments made by the Company for losses not covered under the conditions of the original policy) are not reinsured hereunder.
                    </div>
                </div>
            </div>
            <div id="explanation-6" class="explanation">
                <strong>AI Explanation:</strong> This section has changed from the previous version. The similarity score is 1.00.
            </div>
        </div>

        <div class="comparison-container">
            <div class="section-header">

            </div>
            <div class="section-content">
                <div class="old-section">
                    <div class="section-title">Previous Section:</div>
                    <div>
                        ## Article 4\n| Underwriting fortunes          | 1 To the extent of its participation in this Treaty, the Reinsurer shall follow the underwriting fortunes of the Company in respect of those risks the Company has assumed under its insurance contracts and cover notes.                                                                                           |
|--------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
|                                | Article 5                                                                                                                                                                                                                                                                                                           |
| Errors and omissions           | 1 Any errors and/or inadvertent omissions do not affect the rights and obligations of either Party to this Treaty. Such errors or omissions shall be rectified immediately upon discovery.                                                                                                                          |
|                                | Article 6                                                                                                                                                                                                                                                                                                           |
| Participation of the Reinsurer | 1 The nature and scope of the Reinsurance and the Reinsurer's participation are set out in the Appendix.                                                                                                                                                                                                            |
|                                | 2 Reinsurance is provided in accordance with the original conditions of Insurance of the Company and in the original currencies.                                                                                                                                                                                    |
|                                | 3 The Company undertakes to keep its participation and retention specified in the Appendix un reinsured (except that Reinsurer acknowledges and agrees that in respect of the insurance business reinsured hereunder, the Company has in place reinsurance cover provided by Bumijaya Reinsurance Company Ltd).     |
|                                | Article 7                                                                                                                                                                                                                                                                                                           |
| Liability of the Reinsurer     | 1 Risks Attaching During This Treaty shall apply to all insurances relating to risks covered hereunder issued or renewed on and after the commencement date specified in the Appendix.                                                                                                                              |
|                                | 2 If the Company is unable to collect any payments due to it from other reinsurers under this or any other reinsurance treaty, the liability of the Reinsurer shall not increase.                                                                                                                                   |
|                                | Article 8                                                                                                                                                                                                                                                                                                           |
| Reinsurance premiums           | 1 The Company shall pay to the Reinsurer, net of all deductions, the amount set out in the Appendix. 2 The Company shall pay in advance the agreed annual premium on the dates and in instalments as set out in the Appendix. Nevertheless, the agreed minimum premium defined in the Appendix is owed in any case. |
|                                | Article 9                                                                                                                                                                                                                                                                                                           |
| Ultimate net loss              | 1 Should the ultimate net loss exceed the Retention amount set out in the Appendix, the Reinsurer shall pay the Reinsurer's share of the amount excess thereof within the limits of liability set out in the                                                                                                        |
                    </div>
                </div>
                <div class="new-section">
                    <div class="section-title">New Section (Diff):</div>
                    <div>
                        ## Article 4<br>| Underwriting fortunes          | 1 To the extent of its participation in this Treaty, the Reinsurer shall follow the underwriting fortunes of the Company in respect of those risks the Company has assumed under its insurance contracts and cover notes.                                                                                           |<br>|--------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|<br>|                                | Article 5                                                                                                                                                                                                                                                                                                           |<br>| Errors and omissions           | 1 Any errors and/or inadvertent omissions do not affect the rights and obligations of either Party to this Treaty. Such errors or omissions shall be rectified immediately upon discovery.                                                                                                                          |<br>|                                | Article 6                                                                                                                                                                                                                                                                                                           |<br>| Participation of the Reinsurer | 1 The nature and scope of the Reinsurance and the Reinsurer&#x27;s participation are set out in the Appendix.                                                                                                                                                                                                            |<br>|                                | 2 Reinsurance is provided in accordance with the original conditions of Insurance of the Company and in the original currencies.                                                                                                                                                                                    |<br><del style='background:#ffebee;'>|                                | 3 The Company undertakes to keep its participation and retention specified in the Appendix un reinsured (except that Reinsurer acknowledges and agrees that in respect of the insurance business reinsured hereunder, the Company has in place reinsurance cover provided by Bumijaya Reinsurance Company Ltd).     |</del><br><ins style='background:#e8f5e9;'>|                                | 3 The Company undertakes to keep its participation and retention specified in the Appendix unreinsured (except that Reinsurer acknowledges and agrees that in respect of the insurance business reinsured hereunder, the Company has in place reinsurance cover provided by XYZ Reinsurance Company Ltd).           |</ins><br>|                                | Article 7                                                                                                                                                                                                                                                                                                           |<br>| Liability of the Reinsurer     | 1 Risks Attaching During This Treaty shall apply to all insurances relating to risks covered hereunder issued or renewed on and after the commencement date specified in the Appendix.                                                                                                                              |<br>|                                | 2 If the Company is unable to collect any payments due to it from other reinsurers under this or any other reinsurance treaty, the liability of the Reinsurer shall not increase.                                                                                                                                   |<br>|                                | Article 8                                                                                                                                                                                                                                                                                                           |<br>| Reinsurance premiums           | 1 The Company shall pay to the Reinsurer, net of all deductions, the amount set out in the Appendix. 2 The Company shall pay in advance the agreed annual premium on the dates and in instalments as set out in the Appendix. Nevertheless, the agreed minimum premium defined in the Appendix is owed in any case. |<br>|                                | Article 9                                                                                                                                                                                                                                                                                                           |<br>| Ultimate net loss              | 1 Should the ultimate net loss exceed the Retention amount set out in the Appendix, the Reinsurer shall pay the Reinsurer&#x27;s share of the amount excess thereof within the limits of liability set out in the                                                                                                        |
                    </div>
                </div>
            </div>
            <div id="explanation-7" class="explanation">
                <strong>AI Explanation:</strong> This section has changed from the previous version. The similarity score is 1.00.
            </div>
        </div>

        <div class="comparison-container">
            <div class="section-header">

            </div>
            <div class="section-content">
                <div class="old-section">
                    <div class="section-title">Previous Section:</div>
                    <div>
                        ## Bordereaux, notices of claims and cash claims\nStatements of account

- 2 "Ultimate  net  loss"  means  any  amounts,  including  external expenses to settle claims such as legal costs and expert fees, that the  Company  pays  in  order  to  settle  insurance  losses.  Internal expenses for claims settlements, such as salaries or parts thereof paid to employees and/or agents of the Company as well as other internal or external administration costs incurred by the Company are not included in the ultimate net loss.
- 3 When determining the ultimate net loss, salvages, recoveries or any other payments received from third parties shall be applied as if recovered prior to the aforesaid settlement.
- 4 Payments from underlying excess-of-loss treaties do not reduce the ultimate net loss unless otherwise specified in the Appendix.

Article 10

1 The Company shall submit to the Reinsurer the information set out in the Appendix.

- 2 The Reinsurer must be informed without delay in writing of any claims (incl. reserves) in excess of the claims notification threshold set out in the Appendix. Unless otherwise stipulated in the Appendix, such notification shall contain all relevant facts of the claim, a legal assessment and the estimated total amount of the claim; the former conditions  apply  to  claim  development  updates  as well.
- 3 If any amount due from the Company exceeds the retention set out  in  the  Appendix,  the  Reinsurer  shall  immediately  transfer  its share  thereof  upon  request.  The  Reinsurer  may  set  off  such payments against any other due balances arising out of this Treaty.
                    </div>
                </div>
                <div class="new-section">
                    <div class="section-title">New Section (Diff):</div>
                    <div>
                        ## Bordereaux, notices of claims and cash claims<br>Statements of account<br><br>- 2 &quot;Ultimate  net  loss&quot;  means  any  amounts,  including  external expenses to settle claims such as legal costs and expert fees, that the  Company  pays  in  order  to  settle  insurance  losses.  Internal expenses for claims settlements, such as salaries or parts thereof paid to employees and/or agents of the Company as well as other internal or external administration costs incurred by the Company are not included in the ultimate net loss.<br>- 3 When determining the ultimate net loss, salvages, recoveries or any other payments received from third parties shall be applied as if recovered prior to the aforesaid settlement.<br>- 4 Payments from underlying excess-of-loss treaties do not reduce the ultimate net loss unless otherwise specified in the Appendix.<br><br>Article 10<br><br>1 The Company shall submit to the Reinsurer the information set out in the Appendix.<br><br>- 2 The Reinsurer must be informed without delay in writing of any claims (incl. reserves) in excess of the claims notification threshold set out in the Appendix. Unless otherwise stipulated in the Appendix, such notification shall contain all relevant facts of the claim, a legal assessment and the estimated total amount of the claim; the former conditions  apply  to  claim  development  updates  as well.<br>- 3 If any amount due from the Company exceeds the retention set out  in  the  Appendix,  the  Reinsurer  shall  immediately  transfer  its share  thereof  upon  request.  The  Reinsurer  may  set  off  such payments against any other due balances arising out of this Treaty.
                    </div>
                </div>
            </div>
            <div id="explanation-8" class="explanation">
                <strong>AI Explanation:</strong> This section has changed from the previous version. The similarity score is 1.00.
            </div>
        </div>

        <div class="comparison-container">
            <div class="section-header">

            </div>
            <div class="section-content">
                <div class="old-section">
                    <div class="section-title">Previous Section:</div>
                    <div>
                        ## Article 11\n- 1 The Company shall provide to the Reinsurer statements of account in their original currency no later than four weeks after the dates set out  in  the  Appendix.  The  accounts  shall  be  broken  down  by insurance line of business and type. Claims and annuities amounts (paid and reserved) shall be broken down by year of occurrence/underwriting year.
- 2 The Reinsurer shall confirm the accounts or object to it within three weeks of receipt of the statements of account. Otherwise, the accounts are deemed approved.
- 3 The Company shall pay any balance due to the Reinsurer at the same time as the statements of account are provided. The Reinsurer shall pay any balance due to the Company at the same time as the statements of account are confirmed, but no later than three weeks after receipt of the statements of account. Any bank charges incurred are borne by the Party making the payment.
                    </div>
                </div>
                <div class="new-section">
                    <div class="section-title">New Section (Diff):</div>
                    <div>
                        ## Article 11<br><del style='background:#ffebee;'>- 1 The Company shall provide to the Reinsurer statements of account in their original currency no later than four weeks after the dates set out  in  the  Appendix.  The  accounts  shall  be  broken  down  by insurance line of business and type. Claims and annuities amounts (paid and reserved) shall be broken down by year of occurrence/underwriting year.</del><br><del style='background:#ffebee;'>- 2 The Reinsurer shall confirm the accounts or object to it within three weeks of receipt of the statements of account. Otherwise, the accounts are deemed approved.</del><br><del style='background:#ffebee;'>- 3 The Company shall pay any balance due to the Reinsurer at the same time as the statements of account are provided. The Reinsurer shall pay any balance due to the Company at the same time as the statements of account are confirmed, but no later than three weeks after receipt of the statements of account. Any bank charges incurred are borne by the Party making the payment.</del><br><ins style='background:#e8f5e9;'>1 The Company shall provide to the Reinsurer statements of account in their original currency no later than six weeks after the dates set out  in  the  Appendix.  The  accounts  shall  be  broken  down  by insurance line of business and type. Claims and annuities amounts (paid and reserved) shall be broken down by year of occurrence/underwriting year.</ins><br><ins style='background:#e8f5e9;'></ins><br><ins style='background:#e8f5e9;'>- 2 The Reinsurer shall confirm the accounts or object to it within four weeks of receipt of the statements of account. Otherwise, the accounts are deemed approved.</ins><br><ins style='background:#e8f5e9;'></ins><br><ins style='background:#e8f5e9;'>3 The Company shall pay any balance due to the Reinsurer at the same time as the statements of account are provided. The Reinsurer shall pay any balance due to the Company at the same time as the statements of account are confirmed, but no later than four weeks after receipt of the statements of account. Any bank charges incurred are borne by the Party making the payment.</ins>
                    </div>
                </div>
            </div>
            <div id="explanation-9" class="explanation">
                <strong>AI Explanation:</strong> This section has changed from the previous version. The similarity score is 1.00.
            </div>
        </div>

        <div class="comparison-container">
            <div class="section-header">

            </div>
            <div class="section-content">
                <div class="old-section">
                    <div class="section-title">Previous Section:</div>
                    <div>
                        ## Inspection of records\n
                    </div>
                </div>
                <div class="new-section">
                    <div class="section-title">New Section (Diff):</div>
                    <div>
                        ## Inspection of records<br><ins style='background:#e8f5e9;'>Applicable law and settlement of disputes</ins><br><ins style='background:#e8f5e9;'></ins><br><ins style='background:#e8f5e9;'>- 4 If the Reinsurer objects to any part of the statements of account, the remaining balance must nevertheless be paid immediately. The difference  must  be paid  immediately  upon  settlement  of  the objections.</ins><br><ins style='background:#e8f5e9;'>- 5 Any approved balances under this Treaty may be set off against other  approved  balances  from  this  or  other  treaties  concluded between the Parties.</ins><br><ins style='background:#e8f5e9;'></ins><br><ins style='background:#e8f5e9;'>6 If the statements of account are issued in a currency other than the  original  currency,  all  amounts  in  other  currencies  shall  be converted at the exchange rates valid on the agreed accounts due date.</ins><br><ins style='background:#e8f5e9;'></ins><br><ins style='background:#e8f5e9;'>- 7 Should  balances  not  be  settled  in  the  currency  in  which  the statements of account are issued, such amounts shall be converted at the exchange rates valid on the agreed payment date.</ins><br><ins style='background:#e8f5e9;'>- 8 Cash loss payments to be made by the Reinsurer will be converted at the exchange rate published by the Central Bank in on the day of payment.</ins>
                    </div>
                </div>
            </div>
            <div id="explanation-10" class="explanation">
                <strong>AI Explanation:</strong> This section has changed from the previous version. The similarity score is 1.00.
            </div>
        </div>

        <div class="comparison-container">
            <div class="section-header">

            </div>
            <div class="section-content">
                <div class="old-section">
                    <div class="section-title">Previous Section:</div>
                    <div>
                        ## Applicable law and settlement of disputes\n- 4 If the Reinsurer objects to any part of the statements of account, the remaining balance must nevertheless be paid immediately. The difference  must  be paid  immediately  upon  settlement  of  the objections.
- 5 Any  approved balances under  this  Treaty  must  not  be  set  off against other approved  balances  from  this  or other treaties concluded between the Parties.
- 6 If the statements of account are issued in a currency other than the  original  currency,  all  amounts  in  other  currencies  shall  be converted at the exchange rates valid on the agreed accounts due date.
- 7 Should  balances  not  be  settled  in  the  currency  in  which  the statements of account are issued, such amounts shall be converted at the exchange rates valid on the agreed payment date.
- 8 Cash loss payments to be made by the Reinsurer will be converted at the exchange rate published by the Central Bank in on the day of payment.
                    </div>
                </div>
                <div class="new-section">
                    <div class="section-title">New Section (Diff):</div>
                    <div>
                        <del style='background:#ffebee;'>## Applicable law and settlement of disputes- 4 If the Reinsurer objects to any part of the statements of account, the remaining balance must nevertheless be paid immediately. The difference  must  be paid  immediately  upon  settlement  of  the objections.&lt;br&gt;- 5 Any  approved balances under  this  Treaty  must  not  be  set  off against other approved  balances  from  this  or other treaties concluded between the Parties.&lt;br&gt;- 6 If the statements of account are issued in a currency other than the  original  currency,  all  amounts  in  other  currencies  shall  be converted at the exchange rates valid on the agreed accounts due date.&lt;br&gt;- 7 Should  balances  not  be  settled  in  the  currency  in  which  the statements of account are issued, such amounts shall be converted at the exchange rates valid on the agreed payment date.&lt;br&gt;- 8 Cash loss payments to be made by the Reinsurer will be converted at the exchange rate published by the Central Bank in on the day of payment.</del>
                    </div>
                </div>
            </div>
            <div id="explanation-11" class="explanation">
                <strong>AI Explanation:</strong> This section was removed in the new document.
            </div>
        </div>

        <div class="comparison-container">
            <div class="section-header">

            </div>
            <div class="section-content">
                <div class="old-section">
                    <div class="section-title">Previous Section:</div>
                    <div>
                        ## Article 12\n- 1 The Reinsurer has the right to appoint a representative who has free access at any time during normal office hours to inspect, at the Company's premises and at the expense of the Reinsurer, all records and documents relating to the business covered under this Treaty, subject always to any confidentiality agreements or clauses that the Company is bound to in respect of the information in question.
- 2 The  Reinsurer  shall  advise  the  Company  at  least  72 hours  in advance of its intention to exercise its right of inspection.
- 3 The Reinsurer may exercise its right of inspection as long as one Party  claims  any  liability  against  the  other  Party  in  respect  of business covered hereunder.
- 4 The Company shall, at the request and expense of the Reinsurer, provide  copies  or  extracts  of  all  documents  relating  to  business covered by this Treaty.
                    </div>
                </div>
                <div class="new-section">
                    <div class="section-title">New Section (Diff):</div>
                    <div>
                        ## Article 12<br>- 1 The Reinsurer has the right to appoint a representative who has free access at any time during normal office hours to inspect, at the Company&#x27;s premises and at the expense of the Reinsurer, all records and documents relating to the business covered under this Treaty, subject always to any confidentiality agreements or clauses that the Company is bound to in respect of the information in question.<br><del style='background:#ffebee;'>- 2 The  Reinsurer  shall  advise  the  Company  at  least  72 hours  in advance of its intention to exercise its right of inspection.</del><br><ins style='background:#e8f5e9;'>- 2 The  Reinsurer  shall  advise  the  Company  at  least  48  hours  in advance of its intention to exercise its right of inspection.</ins><br>- 3 The Reinsurer may exercise its right of inspection as long as one Party  claims  any  liability  against  the  other  Party  in  respect  of business covered hereunder.<br>- 4 The Company shall, at the request and expense of the Reinsurer, provide  copies  or  extracts  of  all  documents  relating  to  business covered by this Treaty.
                    </div>
                </div>
            </div>
            <div id="explanation-12" class="explanation">
                <strong>AI Explanation:</strong> This section has changed from the previous version. The similarity score is 1.00.
            </div>
        </div>

        <div class="comparison-container">
            <div class="section-header">

            </div>
            <div class="section-content">
                <div class="old-section">
                    <div class="section-title">Previous Section:</div>
                    <div>
                        ## Article 13\n- 1 This Treaty is governed by and will be construed in accordance the laws of India.
- 2 Any dispute arising out of this Treaty including its formation and validity shall be submitted to an Arbitration Panel composed by three members, meeting in Paris, France.
- 3 Unless  agreed  otherwise,  the  Arbitration  Panel  shall  consist  of active or retired managers of insurance or reinsurance companies with  at  least  ten  years'  experience  in  international  insurance  or reinsurance business.

Leading Reinsurer

- 4 Each party shall appoint one arbitrator. If the defending Party fails to appoint an arbitrator within four weeks after receiving a written request to do so from the other Party, the second arbitrator will be appointed  by  the  President  of  the  Chamber  of  Commerce  and Industry  of  India  or,  in  the  absence  thereof,  by  the  head  of a comparable  organisation  located  in  India.  Before  entering  the proceedings, both arbitrators shall elect a chairperson. Should the two Arbitrators  fail  to  reach  an agreement  within  four weeks  of  their appointment, the chairperson will be appointed by the President of the Chamber of Commerce and Industry of India or, in the absence thereof, by the head of a comparable organisation located in India.
- 5 The arbitrators shall reach their decision in good faith based on common reinsurance market practices and shall not be bound by any legal formalities  or rules. The arbitration panel shall reach its decision at the latest within four months of the appointment of the chairman. The three arbitrators shall decide by majority vote. If no majority can be reached, the chairman shall decide.
- 6 The decision of the Arbitration Panel is final and no appeal may be made to ordinary courts of law. The Arbitration Panel shall, at its discretion, decide how the costs of arbitration shall be allocated.
- 7 If one of the Parties fails to comply with the arbitration decision, the other Party may apply for its enforcement to a court of competent jurisdiction in any country in which the Party in default is domiciled, has assets or conducts business.
- 8 This article remains valid, should this Treaty be void.
                    </div>
                </div>
                <div class="new-section">
                    <div class="section-title">New Section (Diff):</div>
                    <div>
                        ## Article 13<br>- 1 This Treaty is governed by and will be construed in accordance the laws of India.<br><del style='background:#ffebee;'>- 2 Any dispute arising out of this Treaty including its formation and validity shall be submitted to an Arbitration Panel composed by three members, meeting in Paris, France.</del><br><ins style='background:#e8f5e9;'>- 2 Any dispute arising out of this Treaty including its formation and validity shall be submitted to an Arbitration Panel composed by three members, meeting in Delhi, India.</ins><br>- 3 Unless  agreed  otherwise,  the  Arbitration  Panel  shall  consist  of active or retired managers of insurance or reinsurance companies with  at  least  ten  years&#x27;  experience  in  international  insurance  or reinsurance business.<br><br>Leading Reinsurer<br><br><del style='background:#ffebee;'>- 4 Each party shall appoint one arbitrator. If the defending Party fails to appoint an arbitrator within four weeks after receiving a written request to do so from the other Party, the second arbitrator will be appointed  by  the  President  of  the  Chamber  of  Commerce  and Industry  of  India  or,  in  the  absence  thereof,  by  the  head  of a comparable  organisation  located  in  India.  Before  entering  the proceedings, both arbitrators shall elect a chairperson. Should the two Arbitrators  fail  to  reach  an agreement  within  four weeks  of  their appointment, the chairperson will be appointed by the President of the Chamber of Commerce and Industry of India or, in the absence thereof, by the head of a comparable organisation located in India.</del><br><del style='background:#ffebee;'>- 5 The arbitrators shall reach their decision in good faith based on common reinsurance market practices and shall not be bound by any legal formalities  or rules. The arbitration panel shall reach its decision at the latest within four months of the appointment of the chairman. The three arbitrators shall decide by majority vote. If no majority can be reached, the chairman shall decide.</del><br><ins style='background:#e8f5e9;'>- 4 Each party shall appoint one arbitrator. If the defending Party fails to appoint an arbitrator within four weeks after receiving a written request to do so from the other Party, the second arbitrator will be appointed  by  the  President  of  the  Chamber  of  Commerce  and Industry  of  India  or,  in  the  absence  thereof,  by  the  head  of  a comparable  organisation  located  in  India.  Before  entering  the proceedings,  both  arbitrators  shall  elect  a  chairperson.  Should  the two Arbitrators fail to reach an agreement within four weeks of their appointment, the chairperson will be appointed by the President of the  Chamber  of  Commerce  and  Industry  of  India  or,  in  the absence thereof, by the head of a comparable organisation located in India.</ins><br><ins style='background:#e8f5e9;'>- 5 The arbitrators shall reach their decision in good faith based on common reinsurance market practices and shall not be bound by any legal formalities or rules. The arbitration panel shall reach its decision at the latest within four months of the appointment of the chairman. The three arbitrators shall decide by majority vote. If no majority can be reached, the chairman shall decide.</ins><br>- 6 The decision of the Arbitration Panel is final and no appeal may be made to ordinary courts of law. The Arbitration Panel shall, at its discretion, decide how the costs of arbitration shall be allocated.<br><del style='background:#ffebee;'>- 7 If one of the Parties fails to comply with the arbitration decision, the other Party may apply for its enforcement to a court of competent jurisdiction in any country in which the Party in default is domiciled, has assets or conducts business.</del><br><del style='background:#ffebee;'>- 8 This article remains valid, should this Treaty be void.</del><br><ins style='background:#e8f5e9;'>- 7 If one of the Parties fails to comply with the arbitration decision, the other Party may apply for its enforcement to a court of competent jurisdiction in any  country in which the Party in default is domiciled, has assets or conducts business.</ins><br><ins style='background:#e8f5e9;'></ins><br><ins style='background:#e8f5e9;'>8 This article remains valid, should this Treaty be void.</ins>
                    </div>
                </div>
            </div>
            <div id="explanation-13" class="explanation">
                <strong>AI Explanation:</strong> This section has changed from the previous version. The similarity score is 1.00.
            </div>
        </div>

        <div class="comparison-container">
            <div class="section-header">

            </div>
            <div class="section-content">
                <div class="old-section">
                    <div class="section-title">Previous Section:</div>
                    <div>
                        ## Article 14\n- 1 For the purposes of this Agreement, the participating reinsurers shall follow the Leading Reinsurer of this Agreement, who shall be responsible  for  determining,  at  the  request  of  the  Company,  the eligibility of policies and risks for inclusion in this Treaty, including where questions arise with respect to the material and/or geographic scope of this Treaty.
- 2 The decision of the Leading Reinsurer is made immediately after the request and is legally binding for the participating reinsurers. If necessary, the decision shall be issued as a special acceptance. It shall be valid from the beginning of the insurance period agreed with the  Leading  Reinsurer  for  an  indefinite  period  of  time  until  it  is revoked by the Leading Reinsurer. The revocation must be made in good time (at least three months before expiry) so that the Company is able to reinsure the policy or the risk.
                    </div>
                </div>
                <div class="new-section">
                    <div class="section-title">New Section (Diff):</div>
                    <div>
                        ## Article 14<br><del style='background:#ffebee;'>- 1 For the purposes of this Agreement, the participating reinsurers shall follow the Leading Reinsurer of this Agreement, who shall be responsible  for  determining,  at  the  request  of  the  Company,  the eligibility of policies and risks for inclusion in this Treaty, including where questions arise with respect to the material and/or geographic scope of this Treaty.</del><br><ins style='background:#e8f5e9;'>- 1 For  the  purposes  of  this  Agreement,  the  participating  reinsurers shall follow the Leading Reinsurer of this Agreement, who shall be responsible  for  determining,  at  the  request  of  the  Company,  the eligibility of policies and risks for inclusion in this Treaty, including where questions arise with respect to the material and/or geographic scope of this Treaty.</ins><br>- 2 The decision of the Leading Reinsurer is made immediately after the request and is legally binding for the participating reinsurers. If necessary, the decision shall be issued as a special acceptance. It shall be valid from the beginning of the insurance period agreed with the  Leading  Reinsurer  for  an  indefinite  period  of  time  until  it  is revoked by the Leading Reinsurer. The revocation must be made in good time (at least three months before expiry) so that the Company is able to reinsure the policy or the risk.
                    </div>
                </div>
            </div>
            <div id="explanation-14" class="explanation">
                <strong>AI Explanation:</strong> This section has changed from the previous version. The similarity score is 1.00.
            </div>
        </div>

        <div class="comparison-container">
            <div class="section-header">

            </div>
            <div class="section-content">
                <div class="old-section">
                    <div class="section-title">Previous Section:</div>
                    <div>
                        ## Commencement and termination\n
                    </div>
                </div>
                <div class="new-section">
                    <div class="section-title">New Section (Diff):</div>
                    <div>
                        ## Commencement and termination
                    </div>
                </div>
            </div>
            <div id="explanation-15" class="explanation">
                <strong>AI Explanation:</strong> This section has changed from the previous version. The similarity score is 1.00.
            </div>
        </div>

        <div class="comparison-container">
            <div class="section-header">

            </div>
            <div class="section-content">
                <div class="old-section">
                    <div class="section-title">Previous Section:</div>
                    <div>
                        ## Article 15\n- 1 The  period  of  coverage  of  this  Treaty  is  as  set  out  in  the Appendix.
- 2 Either Party has the right to terminate this Treaty at any time with immediate effect upon the following events:
- a) the performance of Treaty is legally or otherwise impossible (de jure or de facto) for reasons beyond the control of the terminating Party;
- b) the other Party is unable to pay its due debts, or its liquidity is impaired, is in bankruptcy or liquidation proceedings are instituted against it or if its licence to conduct business is revoked;
- c) the other Party loses all or part of its paid-up capital;
- d) the other Party has merged, has been acquired or transfers control by change in ownership or otherwise. The Company states that it is ongoing a change of ownership of the shares from ABC EMEA P&amp;C Holding B.V. to PQR Versicherungs-AG. The Reinsurer knows  the  operation  at  the  time  of  signing  the  contract  and, therefore, the foreseen change will not give rise to the possibility of early termination;
- e) the other Party fails to comply with its contractual obligations despite written request to do so or the other Party seriously fails to comply with terms and conditions of this Treaty;
- f) the  country  or  territory  in  which  the  other  Party  has  its registered  domicile  or  head  office  becomes  involved  in  armed hostilities (e.g. civil war) or with any other country, whether war be declared  or  not,  or  is  partly  or  completely  occupied  by  another power.
- 3 The Company has the right to terminate this Treaty at an earlier point in time without observing the period of notice if
- a) the Reinsurer has a rating determined by Standard &amp; Poor's (S&amp;P) and this rating is lowered by S&amp;P during the term of this Treaty. This shall only apply if the downgraded rating is lower than "A-".
- 4 The Reinsurer is obliged to notify the Company immediately of any rating change referred to above.
- 5 Notice of termination must be given in writing by registered letter, or otherwise to the registered office of the Party receiving the notice, or to any other address designated for this purpose herein.
- 6 In  the  event  that  communication  is  interrupted,  a  notice  of termination  will  be  deemed  to  become  effective  at  the  time  of proven dispatch or attempted dispatch.
                    </div>
                </div>
                <div class="new-section">
                    <div class="section-title">New Section (Diff):</div>
                    <div>
                        ## Article 15<br>- 1 The  period  of  coverage  of  this  Treaty  is  as  set  out  in  the Appendix.<br>- 2 Either Party has the right to terminate this Treaty at any time with immediate effect upon the following events:<br>- a) the performance of Treaty is legally or otherwise impossible (de jure or de facto) for reasons beyond the control of the terminating Party;<br>- b) the other Party is unable to pay its due debts, or its liquidity is impaired, is in bankruptcy or liquidation proceedings are instituted against it or if its licence to conduct business is revoked;<br>- c) the other Party loses all or part of its paid-up capital;<br>- d) the other Party has merged, has been acquired or transfers control by change in ownership or otherwise. The Company states that it is ongoing a change of ownership of the shares from ABC EMEA P&amp;amp;C Holding B.V. to PQR Versicherungs-AG. The Reinsurer knows  the  operation  at  the  time  of  signing  the  contract  and, therefore, the foreseen change will not give rise to the possibility of early termination;<br>- e) the other Party fails to comply with its contractual obligations despite written request to do so or the other Party seriously fails to comply with terms and conditions of this Treaty;<br>- f) the  country  or  territory  in  which  the  other  Party  has  its registered  domicile  or  head  office  becomes  involved  in  armed hostilities (e.g. civil war) or with any other country, whether war be declared  or  not,  or  is  partly  or  completely  occupied  by  another power.<br>- 3 The Company has the right to terminate this Treaty at an earlier point in time without observing the period of notice if<br>- a) the Reinsurer has a rating determined by Standard &amp;amp; Poor&#x27;s (S&amp;amp;P) and this rating is lowered by S&amp;amp;P during the term of this Treaty. This shall only apply if the downgraded rating is lower than &quot;A-&quot;.<br>- 4 The Reinsurer is obliged to notify the Company immediately of any rating change referred to above.<br>- 5 Notice of termination must be given in writing by registered letter, or otherwise to the registered office of the Party receiving the notice, or to any other address designated for this purpose herein.<br>- 6 In  the  event  that  communication  is  interrupted,  a  notice  of termination  will  be  deemed  to  become  effective  at  the  time  of proven dispatch or attempted dispatch.
                    </div>
                </div>
            </div>
            <div id="explanation-16" class="explanation">
                <strong>AI Explanation:</strong> This section has changed from the previous version. The similarity score is 1.00.
            </div>
        </div>

        <div class="comparison-container">
            <div class="section-header">

            </div>
            <div class="section-content">
                <div class="old-section">
                    <div class="section-title">Previous Section:</div>
                    <div>
                        ## Severability Clause\nData Protection
                    </div>
                </div>
                <div class="new-section">
                    <div class="section-title">New Section (Diff):</div>
                    <div>
                        ## Severability Clause<br><del style='background:#ffebee;'>Data Protection</del>
                    </div>
                </div>
            </div>
            <div id="explanation-17" class="explanation">
                <strong>AI Explanation:</strong> This section has changed from the previous version. The similarity score is 1.00.
            </div>
        </div>

        <div class="comparison-container">
            <div class="section-header">

            </div>
            <div class="section-content">
                <div class="old-section">
                    <div class="section-title">Previous Section:</div>
                    <div>
                        ## Article 16\n- 1 Should any provision of this Treaty or any provision subsequently incorporated therein be invalid or void in whole or in part, or should a gap in this Treaty become apparent, this shall not affect the validity of the remaining provisions. The invalid or void provision or the gap shall be replaced with retroactive effect by the valid provision that comes  closest  in  legal  and  economic  terms  to  what  the  Parties intended  or  would  have  intended  according  to  the  meaning  and purpose of this Treaty if they had known about the invalidity or the gap when concluding the Treaty.
                    </div>
                </div>
                <div class="new-section">
                    <div class="section-title">New Section (Diff):</div>
                    <div>
                        ## Article 16<br>- 1 Should any provision of this Treaty or any provision subsequently incorporated therein be invalid or void in whole or in part, or should a gap in this Treaty become apparent, this shall not affect the validity of the remaining provisions. The invalid or void provision or the gap shall be replaced with retroactive effect by the valid provision that comes  closest  in  legal  and  economic  terms  to  what  the  Parties intended  or  would  have  intended  according  to  the  meaning  and purpose of this Treaty if they had known about the invalidity or the gap when concluding the Treaty.
                    </div>
                </div>
            </div>
            <div id="explanation-18" class="explanation">
                <strong>AI Explanation:</strong> This section has changed from the previous version. The similarity score is 1.00.
            </div>
        </div>

        <div class="comparison-container">
            <div class="section-header">

            </div>
            <div class="section-content">
                <div class="old-section">
                    <div class="section-title">Previous Section:</div>
                    <div>
                        ## Article 17\n- 1 The terms "Personal Data", "Data Subjects", "Controller", "Processing" and "Supervisory Authority" used in this clause have the same meaning as in Article 4 of the Data Protection Regulation (EU) 2016/679 (hereinafter GDPR).
- 2 The GDPR set out the conditions for the Processing of Personal Data,  regardless  of  whether  that  Personal  Data  relates  to  the policyholder  or  to  a  person  or  persons  who  are  Data  Subjects  in relation to the underlying insurance policy.
- 3 With respect to such Personal Data to which this clause relates, both  the  Company  and  the  Reinsurer  are  classified  as  Data Controllers. They independently determine the purpose and manner of the Processing of Personal Data.
- 4 In order to obtain and maintain reinsurance cover, the Company acknowledges the obligations incumbent on it as a Data Controller to comply with the provisions of the GDPR. The Company also confirms that it has made all necessary notifications to the Data Subjects in accordance with the provisions of the GDPR to enable the transfer and/or disclosure of Personal Data to the reinsurer.
- 5 The Reinsurer equally acknowledges the obligations imposed on it to comply with the provisions of the GDPR, whether or not it is a reinsurer established in the European Union. Personal Data within the meaning of this clause provided by the Company to the Reinsurer in  the  context  of  a  reinsurance  activity  under  this  clause  shall  be processed by the Reinsurer as a Data Controller in accordance with the provisions of the GDPR.
- 6 Each Party responds to a Data Subject request or notification under the GDPR addressed to them. In order for the Parties to comply with their  respective  obligations  under  the  GDPR  with  respect  to  the Processing of Personal Data, in particular with respect to responding to  requests  or  notifications  from  Data  Subjects  under  the  GDPR and/or  requests from  Supervisory Authorities, the Parties will cooperate and assist  each other appropriately for the purpose of fulfilling their respective obligations.

- 7 Personal  Data  may  solely  be  processed  by  the  Reinsurer  for following purposes:
- -Carry  out  a  claims  assessment  on  a  case-by-case  basis  to verify its obligation to compensate the Company.
- -Where requested by the Company, support the Company in claims assessment as well as in the evaluation of processes, including a review of the Company's claims assessments.
- -Further purposes compatible with the above, as for example statistical or scientific research

8 The Reinsurer will treat all Personal Data as confidential and require all retrocessionaires and further third parties acting on behalf of the Reinsurer, if any, to do so.
                    </div>
                </div>
                <div class="new-section">
                    <div class="section-title">New Section (Diff):</div>
                    <div>
                        ## Article 17<br>- 1 The terms &quot;Personal Data&quot;, &quot;Data Subjects&quot;, &quot;Controller&quot;, &quot;Processing&quot; and &quot;Supervisory Authority&quot; used in this clause have the same meaning as in Article 4 of the Data Protection Regulation (EU) 2016/679 (hereinafter GDPR).<br>- 2 The GDPR set out the conditions for the Processing of Personal Data,  regardless  of  whether  that  Personal  Data  relates  to  the policyholder  or  to  a  person  or  persons  who  are  Data  Subjects  in relation to the underlying insurance policy.<br>- 3 With respect to such Personal Data to which this clause relates, both  the  Company  and  the  Reinsurer  are  classified  as  Data Controllers. They independently determine the purpose and manner of the Processing of Personal Data.<br>- 4 In order to obtain and maintain reinsurance cover, the Company acknowledges the obligations incumbent on it as a Data Controller to comply with the provisions of the GDPR. The Company also confirms that it has made all necessary notifications to the Data Subjects in accordance with the provisions of the GDPR to enable the transfer and/or disclosure of Personal Data to the reinsurer.<br>- 5 The Reinsurer equally acknowledges the obligations imposed on it to comply with the provisions of the GDPR, whether or not it is a reinsurer established in the European Union. Personal Data within the meaning of this clause provided by the Company to the Reinsurer in  the  context  of  a  reinsurance  activity  under  this  clause  shall  be processed by the Reinsurer as a Data Controller in accordance with the provisions of the GDPR.<br><del style='background:#ffebee;'>- 6 Each Party responds to a Data Subject request or notification under the GDPR addressed to them. In order for the Parties to comply with their  respective  obligations  under  the  GDPR  with  respect  to  the Processing of Personal Data, in particular with respect to responding to  requests  or  notifications  from  Data  Subjects  under  the  GDPR and/or  requests from  Supervisory Authorities, the Parties will cooperate and assist  each other appropriately for the purpose of fulfilling their respective obligations.</del><br><ins style='background:#e8f5e9;'></ins><br><ins style='background:#e8f5e9;'>6 Each Party responds to a Data Subject request or notification under the GDPR addressed to them. In order for the Parties to comply with their  respective  obligations  under  the  GDPR  with  respect  to  the Processing of Personal Data, in particular with respect to responding to  requests  or  notifications  from  Data  Subjects  under  the  GDPR and/or  requests from  Supervisory Authorities, the Parties will cooperate and assist  each other appropriately for the purpose of fulfilling their respective obligations.</ins><br><br>- 7 Personal  Data  may  solely  be  processed  by  the  Reinsurer  for following purposes:<br>- -Carry  out  a  claims  assessment  on  a  case-by-case  basis  to verify its obligation to compensate the Company.<br>- -Where requested by the Company, support the Company in claims assessment as well as in the evaluation of processes, including a review of the Company&#x27;s claims assessments.<br>- -Further purposes compatible with the above, as for example statistical or scientific research<br><br>8 The Reinsurer will treat all Personal Data as confidential and require all retrocessionaires and further third parties acting on behalf of the Reinsurer, if any, to do so.
                    </div>
                </div>
            </div>
            <div id="explanation-19" class="explanation">
                <strong>AI Explanation:</strong> This section has changed from the previous version. The similarity score is 1.00.
            </div>
        </div>

    </div>

    <div class="new-sections-header">
        <h2>New Sections not found in Previous Document</h2>
    </div>

    <div id="new-sections">

        <div class="comparison-container">
            <div class="section-header">
                <h3>New Section</h3>
                <button class="explain-btn" onclick="toggleExplanation('explanation-new-4')">Explain with AI</button>
            </div>
            <div class="section-content">
                <div class="old-section">
                    <div class="section-title">Previous Section:</div>
                    <div>
                        <em>Section not found in Previous document.</em>
                    </div>
                </div>
                <div class="new-section">
                    <div class="section-title">New Section (Diff):</div>
                    <div>
                        <ins style='background:#e8f5e9;'>## Insurance conditions, tariffs and underwriting policies\n</ins>
                    </div>
                </div>
            </div>
            <div id="explanation-new-4" class="explanation">
                <strong>AI Explanation:</strong> This is a newly added section that didn&#x27;t exist in the previous document.
            </div>
        </div>

        <div class="comparison-container">
            <div class="section-header">
                <h3>New Section</h3>
                <button class="explain-btn" onclick="toggleExplanation('explanation-new-18')">Explain with AI</button>
            </div>
            <div class="section-content">
                <div class="old-section">
                    <div class="section-title">Previous Section:</div>
                    <div>
                        <em>Section not found in Previous document.</em>
                    </div>
                </div>
                <div class="new-section">
                    <div class="section-title">New Section (Diff):</div>
                    <div>
                        <ins style='background:#e8f5e9;'>## Data Protection\n</ins>
                    </div>
                </div>
            </div>
            <div id="explanation-new-18" class="explanation">
                <strong>AI Explanation:</strong> This is a newly added section that didn&#x27;t exist in the previous document.
            </div>
        </div>

    </div>

    <script>
        function toggleExplanation(id) {
            const explanation = document.getElementById(id);
            if (explanation.style.display === "block") {
                explanation.style.display = "none";
            } else {
                explanation.style.display = "block";
            }
        }
    </script>
</body>
</html>

`;

export const PegaExtensionsFieldAsElement = (props: ActionableNewButtonProps) => {
  const { getPConnect, value, localAction } = props;
  if (value && localAction) {
    const availableActions =
      getPConnect().getValue((window as any).PCore.getConstants().CASE_INFO.AVAILABLEACTIONS) || [];
    // const targetAction = availableActions.find((action: { ID: string }) => action.ID === localAction);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const LaunchLocalAction = async () => {
      // eslint-disable-next-line no-console
      console.log('okkkk');
      try {

        getPConnect().getListActions().updateProperty('.FirstName', 'John Doe dsadsa');

        getPConnect().getActionsApi().updateFieldValue('.FirstName', 'John Doe m');

        getPConnect().getActionsApi().updateFieldValue('FirstName', 'John Doe lp');

      } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error);
      }
      // eslint-disable-next-line no-console
      console.log(availableActions);
    };
    return (
      <Flex container={{ direction: 'row' }}>
       { parse(html) }
      </Flex>
    );
  }
  return null;
};

export default withConfiguration(PegaExtensionsFieldAsElement);
