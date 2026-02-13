# 💕 Valentine V2 - AI-Powered Valentine's Message Generator

A beautiful, interactive web application that generates personalized Valentine's Day messages using AI. Create heartfelt messages for your crush, partner, situationship, or even your bros!

## ✨ Features

### 🤖 AI-Powered Message Generation

- **Gemini API** - Generates safe and medium messages
- **GPT-4 API** - Creates unhinged, bold messages
- Smart routing based on message type and relationship context

### 💌 Multi-Step Interactive Flow

1. **Welcome Screen** - Beautiful animated entrance
2. **Name Input** - Enter your name and your valentine's name
3. **Ship Type Selection** - Choose your relationship type:
   - 💘 Crush - For someone you haven't confessed to yet
   - ❤️ Relationship - For your romantic partner
   - 💫 Situationship - For complicated romantic situations
   - 🤝 Brozone - For your bros (with comedy and good vibes)
4. **Boldness Level** - Select message intensity:
   - 😊 Safe - Sweet and wholesome
   - 😏 Medium - Flirty and charming
   - 🔥 Unhinged - Bold and passionate
5. **Style Choice** - For unhinged messages, choose fantasy or raw style
6. **Review & Generate** - See your selections and generate the message

### 🎁 Special Features

#### Brozone Mode

- Casual, bro-like language with humor
- Uses phrases like "bro", "my guy", "homie", "insha'Allah"
- Perfect balance of comedy and genuine care
- "Vibes and insha'Allah" energy ✨

#### Welcome Screen for Recipients

- Recipients see "{sender} has a surprise for you! 💕"
- Tap-to-reveal button for dramatic effect
- Creators see the message immediately
- Smooth animated transitions

#### Share Features

- **QR Code Generation** - Scannable codes for easy sharing
- **Short URLs** - Compact links that work perfectly with QR codes
- **Copy to Clipboard** - One-click link and message copying
- **Gmail-Style Display** - Beautiful email-inspired message layout

### 🔗 URL Shortening System

- Messages stored via API with 6-character IDs
- Short URLs like: `yoursite.com/message?id=abc123`
- Solves QR code compatibility issues
- No localStorage - everything via API

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and pnpm
- Gemini API key
- RapidAPI key (for GPT-4 access)

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/Pluggito/valentine-v2.git
cd valentine-v2
```

2. **Install dependencies**

```bash
pnpm install
```

3. **Set up environment variables**

Create a `.env` file in the root directory:

```env
# Google Gemini API Key (for safe/medium messages)
NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_api_key_here

# RapidAPI Key (for GPT-4 unhinged messages)
RAPIDAPI_KEY=your_rapidapi_key_here
```

4. **Run the development server**

```bash
pnpm dev
```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🎨 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **QR Codes**: qrcode.react
- **AI APIs**:
  - Google Gemini (via @google/generative-ai)
  - GPT-4 (via RapidAPI)

## 📁 Project Structure

```
valetine-v2/
├── app/
│   ├── api/
│   │   ├── generate-gemini/    # Gemini API endpoint
│   │   ├── generate-gpt4/      # GPT-4 API endpoint
│   │   └── messages/           # Message storage API
│   ├── message/                # Message display page
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── home.tsx                # Main flow component
│   ├── valentine-button.tsx    # Animated button
│   ├── welcome-text.tsx        # Welcome screen
│   └── ...
├── lib/
│   ├── valentine-data.ts       # TypeScript interfaces
│   ├── prompts.ts              # AI prompt templates
│   └── utils.ts
└── public/
```

## 🔧 API Endpoints

### POST `/api/generate-gemini`

Generates safe or medium messages using Gemini AI.

**Request Body:**

```json
{
  "name": "John",
  "partnerName": "Jane",
  "shipType": "crush",
  "messageType": "safe",
  "fantasyOrRaw": null
}
```

### POST `/api/generate-gpt4`

Generates unhinged messages using GPT-4.

**Request Body:**

```json
{
  "name": "John",
  "partnerName": "Jane",
  "shipType": "relationship",
  "messageType": "unhinged",
  "fantasyOrRaw": "fantasy"
}
```

### POST `/api/messages`

Stores a message and returns a short ID.

**Request Body:**

```json
{
  "message": "Your generated message...",
  "partner": "Jane",
  "sender": "John"
}
```

**Response:**

```json
{
  "id": "abc123"
}
```

### GET `/api/messages?id=abc123`

Retrieves a stored message by ID.

## 🎯 Usage Flow

### For Creators:

1. Complete the multi-step form
2. Click "Generate Message"
3. View the generated message immediately
4. Share via QR code or copy link
5. Send to your valentine!

### For Recipients:

1. Scan QR code or click shared link
2. See welcome screen with teaser
3. Tap "Check It Out" to reveal
4. Read the personalized message
5. Can share it further if desired

## 🌟 Key Features Explained

### Smart AI Routing

The app automatically selects the right AI based on your choices:

- **Safe/Medium** → Gemini (wholesome, appropriate)
- **Unhinged** → GPT-4 (bold, passionate)

### Brozone Special Mode

When you select "brozone" as the ship type, the AI:

- Uses casual, friendly language
- Adds humor and inside jokes
- Includes phrases like "insha'Allah" naturally
- Keeps it real while showing you care

### URL Shortening

Messages are stored server-side with short IDs to:

- Create QR-code-friendly URLs
- Avoid URL length limits
- Enable easy sharing

## 🔐 Environment Variables

| Variable                     | Description            | Required |
| ---------------------------- | ---------------------- | -------- |
| `NEXT_PUBLIC_GEMINI_API_KEY` | Google Gemini API key  | Yes      |
| `RAPIDAPI_KEY`               | RapidAPI key for GPT-4 | Yes      |

## 📝 Notes

- **In-Memory Storage**: The current implementation uses in-memory storage for messages. For production, replace with a database (PostgreSQL, MongoDB, etc.)
- **API Rate Limits**: Be aware of rate limits on Gemini and RapidAPI
- **Message Persistence**: Messages are stored temporarily. Implement database storage for permanent retention

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the MIT License.

## 🙏 Acknowledgments

- Google Gemini for AI capabilities
- OpenAI GPT-4 via RapidAPI
- Next.js team for the amazing framework
- Framer Motion for smooth animations

---

Made with 💕 by [Pluggito](https://github.com/Pluggito)

**Happy Valentine's Day!** 🌹
