const forgotPasswordTemplate = ({ name, otp }) => {
  return `
<div>
    <p>Dear, ${name}</p>
    <p>Hai richiesto di reimpostare la password. Utilizza il seguente codice OTP per reimpostare la password.</p>
    <div style="background:yellow; font-size:20px;padding:20px;text-align:center;font-weight : 800;">
        ${otp}
    </div>
    <p>Questo OTP è valido solo per 1 ora. Inserisci questo OTP nel sito web binkeyit per procedere con la reimpostazione della password.</p>
    <br/>
    </br>
    <p>Thanks</p>
    <p>Binkeyit</p>
</div>
    `
};

export default forgotPasswordTemplate;
