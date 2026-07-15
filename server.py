#!/usr/bin/env python3
import http.server
import ssl
import os
from pathlib import Path
from urllib.parse import urlparse


# Change to hoodies directory
os.chdir(r'C:\Users\shriy\OneDrive\Documents\hoodies')

# Create self-signed certificate if it doesn't exist
cert_file = 'server.crt'
key_file = 'server.key'

if not os.path.exists(cert_file) or not os.path.exists(key_file):
    print("Generating self-signed certificate...")
    os.system(f'python -m ssl --cert {cert_file} --key {key_file}')

class RestrictedHandler(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        parsed_path = urlparse(self.path)
        if parsed_path.path.rstrip('/') in {'/admin', '/admin.html'}:
            self.send_response(302)
            self.send_header('Location', '/index.html')
            self.end_headers()
            return
        super().do_GET()

# Start HTTPS server
port = 3000
handler = RestrictedHandler

# Create SSL context
context = ssl.SSLContext(ssl.PROTOCOL_TLS_SERVER)
context.load_cert_chain(cert_file, key_file)

with http.server.HTTPServer(('0.0.0.0', port), handler) as httpd:
    print(f"✓ HTTPS server running at https://the-zen:{port}")
    print(f"✓ Press Ctrl+C to stop")
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\n✓ Server stopped")
