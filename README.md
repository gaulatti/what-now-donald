# What Now, Donald? - README

**It's live!** https://bsky.app/profile/whatnowdonald.bsky.social

## 📖 Introduction

**What Now, Donald?** is a TypeScript-based project built using the **AWS Cloud Development Kit (CDK)**. It is designed to integrate with social media platforms like **Truth Social** and **Bluesky**, leveraging **Google Generative AI** to process posts and generate content. The application fetches posts from Truth Social, analyzes them using AI, and publishes the results to Bluesky while also notifying a Slack channel.

The project is a serverless application that is deployed using AWS infrastructure, including **AWS Lambda**, **DynamoDB**, and **CloudWatch** for scheduling and logging.

---

## ✨ Features

- **Social Media Integration**:
  - Fetches posts from **Truth Social**.
  - Publishes AI-generated content to **Bluesky**.
- **AI-Powered Content Generation**:
  - Uses **Google Generative AI** for analyzing and summarizing posts.
- **Slack Notifications**:
  - Sends updates to a specified Slack channel with post summaries and links.
- **Serverless Architecture**:
  - Built on AWS Lambda with efficient resource management.
- **Data Persistence**:
  - Utilizes DynamoDB for tracking processed posts.
- **Automatic Scheduling**:
  - Runs periodically using AWS EventBridge rules.
- **Rich Media Processing**:
  - Handles posts with text, images, and other media.

---

## ✅ Requirements

To use or contribute to this project, you will need:

1. **Node.js** (version 16 or higher recommended).
2. **AWS CDK** CLI (version 2.x).
3. **Google API Key** for Generative AI integration.
4. **Bluesky Account Credentials** (username and password).
5. **Slack Webhook URL** for notifications.
6. AWS account with permissions to deploy CDK applications.

---

## 🔧 Installation

Follow these steps to set up the project locally:

1. **Clone the Repository**:
    ```bash
    git clone https://github.com/gaulatti/what-now-donald.git
    cd what-now-donald
    ```

2. **Install Dependencies**:
    ```bash
    npm install
    ```

3. **Set Environment Variables**:
    Create a `.env` file in the root directory:
    ```plaintext
    GEMINI_CREDENTIALS=<your_google_api_key>
    BLUESKY_USERNAME=<your_bluesky_username>
    BLUESKY_PASSWORD=<your_bluesky_password>
    SLACK_URL=<your_slack_webhook_url>
    CHROMIUM_LAYER_ARN=<your_chromium_layer_arn>
    ```

4. **Build the Project**:
    ```bash
    npm run build
    ```

5. **Deploy to AWS**:
    ```bash
    npm run deploy
    ```

---

## 🛠️ Configuration

The application uses environment variables for configuration. These include:

- `GEMINI_CREDENTIALS`: API key for Google Generative AI.
- `BLUESKY_USERNAME` and `BLUESKY_PASSWORD`: Credentials for Bluesky integration.
- `SLACK_URL`: Webhook URL for sending Slack notifications.
- `CHROMIUM_LAYER_ARN`: ARN for the Chromium layer used by Puppeteer.
- `TABLE_NAME`: DynamoDB table name for tracking processed posts. This is passed by CDK to the lambda.

---

## 🚀 Usage

Once the application is deployed, it will automatically:

1. Fetch posts from Truth Social using a headless browser (Puppeteer).
2. Analyze the content using Google Generative AI.
3. Post the generated content to Bluesky.
4. Notify a Slack channel with a summary and a link to the original post.

You can also test the application locally using the following commands:

- **Run Tests**:
    ```bash
    npm test
    ```
- **Lint Code**:
    ```bash
    npm run lint
    ```

---

## 🤝 Contributing

Contributions are welcome! To contribute:

1. Fork the repository.
2. Create a new branch for your feature or bug fix:
    ```bash
    git checkout -b feature-name
    ```
3. Commit your changes:
    ```bash
    git commit -m "Add a new feature"
    ```
4. Push to your branch:
    ```bash
    git push origin feature-name
    ```
5. Open a pull request.

Please ensure your code adheres to the project's linting rules and passes all tests.

---

## ⚖️ License

This project is licensed under the **MIT License**. See the `LICENSE` file for more details.

---

## 🧩 Additional Notes

- The project uses **TypeScript** for type safety and maintainability.
- It includes unit tests written with **Jest**.
- The AWS CDK stack includes resources for Lambda functions, DynamoDB tables, and EventBridge rules.
- Chromium is included as a Lambda layer for headless browser operations.

---

Enjoy using **What Now, Donald?**! 🎉