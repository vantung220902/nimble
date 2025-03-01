
echo "Initializing Nimble code challenge client..."

read -p "Do you want to installl pnpm? (y/N) " answer
if [[ "$answer" =~ ^[Yy]$ ]]; then
  echo "Install pnpm..."
  npm install -g pnpm
fi

echo "Creating .env file..."
cp .env.example .env

echo "Installing dependencies..."
pnpm install

echo "Nimble code challenge client initialized!"

echo "Run 'pnpm dev' to start Nimble code challenge client"
