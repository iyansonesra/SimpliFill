## SimpliFill

Demo video: https://youtu.be/vVp6MqBwgU0
AI-Based Government Document Auto-Filler simplifies the completion of essential government forms for immigrants with limited English proficiency. Using AI and document processing technologies, this tool streamlines the often complex paperwork process into an accessible experience. Users can easily extract personal information from uploaded documents to automatically populate required fields, ensuring accuracy and saving time. This platform bridges language barriers and empowers immigrants to confidently manage their documentation needs.

## Inspiration
We were inspired by the challenges non-English speaking immigrants face when dealing with crucial government paperwork. Recognizing the need for a solution to alleviate stress and confusion associated with complex forms in unfamiliar languages, we aimed to create a tool that assists in accurate form completion while promoting independence among immigrants navigating bureaucratic systems in their new home country.

## What it does
AI-Based Government Document Auto-Filler automates government form completion for immigrants using advanced AI. Users upload personal documents, and the system extracts relevant information to populate various government forms. Supporting multiple languages, it offers real-time translation and guidance throughout the process. The tool aims to reduce errors, save time, and improve accessibility to essential services for those who need them most

## How we built it
We built our AI-based government document auto-filler using a combination of:
* [Llama 3.2 90B Vision Preview](https://huggingface.co/meta-llama/Llama-3.2-90B-Vision) - A large multimodal language model capable of processing both text and images, enabling advanced document understanding and visual reasoning.
* [Llama 3.1 70B Versatile](https://huggingface.co/meta-llama/Llama-3.1-70B) - A powerful language model optimized for a wide range of natural language tasks, providing robust multilingual support and high-quality text generation4.
* [Llama 3.1 8B Instant](https://huggingface.co/meta-llama/Llama-3.1-8B) - A lightweight language model designed for quick responses and efficient processing, ideal for real-time applications and edge devices3.
* [All-MiniLM-L6-v2](https://huggingface.co/sentence-transformers/all-MiniLM-L6-v2) - A compact sentence transformer model that maps text to dense vector representations, facilitating efficient semantic search and text clustering5.
* [Splade_PP_en_v1](https://huggingface.co/prithivida/Splade_PP_en_v1) - A sparse text embedding model that balances retrieval effectiveness and efficiency, enabling fast and accurate information retrieval6.
React 19 - The latest version of the popular JavaScript library for building user interfaces, featuring new capabilities like automatic rendering optimization and improved error handling7.
* [LangChain](https://langchain.com/) - An open-source framework that simplifies the integration of large language models with external data sources, enabling the creation of powerful AI-driven applications
