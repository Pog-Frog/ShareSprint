# TWITTER clone with React, Express, Tailwind, Next, MongoDB, Vercel

## Demo
![dashboard.png](/assets/dashboard.png)
![Login.png](/assets/Login.png)
![profile.png](/assets/profile.png)
![profile_edit.png](/assets/profile_edit.png)
![notifications.png](/assets/notifications.png)
![image_upload.png](/assets/image_upload.png)
![notifications.png](/assets/notifications.png)
![comments.png](/assets/comments.png)

## Getting Started

`First`, install the dependencies, by running this command in the root directory:

```bash
npm i
```

`Second`, Fill in the environment variables in the `.env` file in the frontend and backend folders respectively:
- Connect to your MongoDB database and add the connection string to the `DB_URL` variable, in the backend `.env` file
![diagonal-vs-non-diagonal](/assets/mongo.png)
- Fill the Mail variables with your mail credentials, in the backend `.env` file
- Create a Cloudinary account and add your credentials to the `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, and `CLOUDINARY_API_SECRET` variables [Tutorial Link](https://cloudinary.com/documentation/node_integration#configuration)
  - Add the `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` variable to the frontend `.env` file
  - make sure that you create an unsigned upload preset and update the `uploadPreset` variable in the `ShareSprint/frontend/components/ImageUpload.tsx` file with it
        ![preset image](/assets/preset.png)
    *Note:* The app won't work without the couldinary credentials

`Third`, you can run the application both the frontend and the backend concurrently, in development mode by running:

```bash
npm run build; npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Key Features

- Fullstack fully functional Social Media App
- Standalone REST API with scalable good architecture using Express
- Fully functional frontend with Next and React
- Authentication system with email verification
- Notifications and alerts
- Tailwind design for sleek UI
- Tailwind animations and transition effects
- Server error handling with react-toast
- Notification system
- Full responsiveness for all devices
- Image handling with Cloudinary CDN
- 1 To Many Relations (User - Post)
- Many To Many Relations (Post - Comment)
- Following functionality
- Comments / Replies
- Likes functionality
- Managing global state using Redux
- Vercel Deployment
- Dockerized
