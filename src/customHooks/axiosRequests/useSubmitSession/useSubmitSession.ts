// @ts-nocheck
import { useFormDataContext } from 'state/formDataState/context';
import { useGlobalContext } from 'state/globalState/context';

const useSubmitSession = () => {
  const [formDataState] = useFormDataContext();
  const [, globalStateDispatch] = useGlobalContext();
  const fileData = [];
  const files = [
    formDataState.ApplicantPhoto,
    formDataState.proofDocumentArms,
    formDataState.proofDocumentBlind,
    formDataState.proofDocumentDeaf,
    formDataState.proofDocumentDrive,
    formDataState.proofDocumentLanguage,
    formDataState.proofDocumentLearn,
    formDataState.proofDocumentWalk,
  ];
  const checkAnswersEl = document.getElementById('application-summary');
  // remove change button
  const editedText =
    checkAnswersEl &&
    checkAnswersEl.outerHTML.replaceAll(
      '<td class="wmnds-text-align-right" colspan="0"><button type="button" class="wmnds-btn wmnds-btn--link">Change</button></td>',
      '',
    );
  const sendEmailHandler = async () => {
    const base64Content = editedText && btoa(unescape(encodeURIComponent(editedText)));
    // returns the base64 string of files
    const toBase64 = (file: Blob) =>
      new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
      });
    const filteredFiles = files.filter((n) => n);
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < filteredFiles.length; i++) {
      // eslint-disable-next-line no-await-in-loop
      const base64File = await toBase64(filteredFiles[i]);
      fileData.push({
        name: filteredFiles[i].name,
        type: filteredFiles[i].type,
        content: base64File.split('base64,')[1],
      });
    }
    await fetch(`https://internal-api.wmca.org.uk/emails/api/email`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify({
        to: 6,
        subject: 'emailHeader',
        body: '{"M":"j"}',
        bodyHtml: base64Content,
        from: 'test@test.com',
        files: fileData || [],
      }),
    }).then((response) => {
      // If the response is successful(200: OK)
      if (response.status === 200) {
        globalStateDispatch({
          type: 'SHOW_SUCCESS_PAGE',
          payload: Math.floor(Math.random() * 10000000 + 1).toString(),
        });
      }
    });
  };
  return sendEmailHandler();
};

export default useSubmitSession;
