#!/bin/bash

echo "🚀 Starting Notes API setup..."

if [ ! -f .env ]; then
  echo "❌ .env file not found."
  echo "Please create a .env file before continuing."
  exit 1
fi

echo ""
echo "📦 Installing dependencies..."
npm install

echo ""
echo "🔧 Generating Prisma Client..."
npx prisma generate

echo ""
echo "🗄️ Running database migrations..."
npx prisma migrate deploy

echo ""
echo "✅ Setup completed successfully!"

echo ""
echo "Run the application with:"
echo ""
echo "npm run dev"