#!/bin/sh
set -e

# Require VITE_API_URL to be set in production
if [ -z "$VITE_API_URL" ]; then
  echo "ERROR: VITE_API_URL environment variable is required"
  exit 1
fi

# Create runtime config from environment variables
cat > /usr/share/nginx/html/config.json << EOF
{
  "API_URL": "$VITE_API_URL"
}
EOF

echo "Runtime config written to /usr/share/nginx/html/config.json"
cat /usr/share/nginx/html/config.json

# Start nginx
exec "$@"
