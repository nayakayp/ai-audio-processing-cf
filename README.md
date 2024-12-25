# AI Audio Processing

A modern web application that transcribes audio, generates summaries, and provides AI-powered insights using OpenAI's APIs.

## Screenshot

<img width="1440" alt="image" src="https://github.com/user-attachments/assets/da469c53-7953-45b4-a50f-ee4364713b7d" />


## Features

- 🎙️ Real-time audio recording and transcription
- 📝 Document processing and text analysis
- 🤖 AI-powered summaries and key takeaways
- 💬 Interactive Q&A with your documents
- 🔊 Text-to-speech conversion
- 📚 Document library with local storage
- 🎯 Responsive and modern UI

## Tech Stack

- **Framework**: Next.js 15 with Edge Runtime
- **Deployment**: Cloudflare Pages
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Storage**: IndexedDB
- **AI Integration**: OpenAI API (GPT-4, Whisper)
- **Audio Processing**: WebAudio API
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js 18.17 or later
- OpenAI API key

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/ai-audio-processing-cf.git
cd ai-audio-processing-cf
```

2. Install dependencies:
```bash
npm install
```

3. Configure your OpenAI API key in `wrangler.toml`:
```toml
[vars]
OPENAI_API_KEY = "your_api_key_here"
```

4. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:3000`.

## Development

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build locally
- `npm run deploy` - Deploy to Cloudflare Pages

## Project Structure

```
src/
├── app/              # Next.js app router pages
├── components/       # Reusable UI components
├── hooks/           # Custom React hooks
├── lib/             # Utility functions and core logic
│   ├── audio/       # Audio recording functionality
│   ├── openai/      # OpenAI API integration
│   ├── store/       # Zustand state management
│   └── utils/       # Helper functions
└── types/           # TypeScript type definitions
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [OpenAI](https://openai.com/) for providing the AI APIs
- [Cloudflare](https://www.cloudflare.com/) for the hosting platform
- [Next.js](https://nextjs.org/) for the amazing framework
- [Tailwind CSS](https://tailwindcss.com/) for the styling system

## Support

If you find this project helpful, please give it a ⭐️ on GitHub!
