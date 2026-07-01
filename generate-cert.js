const { spawn } = require('child_process');

// Generate self-signed certificate using PowerShell
const ps = spawn('powershell.exe', [
  '-Command',
  `$cert = New-SelfSignedCertificate -CertStoreLocation 'Cert:\\CurrentUser\\My' -Subject 'CN=localhost' -KeyAlgorithm RSA -KeyLength 2048 -NotAfter (Get-Date).AddYears(1); Export-Certificate -Cert $cert -FilePath server.crt -Type CERT; Export-PfxCertificate -Cert $cert -FilePath server.pfx -Password (ConvertTo-SecureString -String '' -AsPlainText -Force); Write-Host 'Certificate created!';`
]);

ps.on('close', (code) => {
  if (code === 0) {
    console.log('✓ Certificate generated successfully!');
    console.log('Run "npm run start:https" to start the server with HTTPS');
  } else {
    console.log('Certificate generation completed.');
  }
});
