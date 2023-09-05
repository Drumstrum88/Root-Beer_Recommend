# Root Beer Recommend App

Root Beer Recommend is a web application built using React, Next.js, and Firebase. This app allows authenticated users to explore a community of recommended root beers, recommend their favorite root beers, and interact with the root beer community. Below, you will find an overview of the app's features and instructions on how to use it.

## Features

### Authentication
- Users can sign in to the app using Firebase Authentication.

### Community Recommendations
- Authenticated users can view a community of recommended root beers.
- Users can recommend their favorite root beers through a recommend form.
- Root beers must be associated with a store, selected via a dropdown in the form.
- If a store is not found in the database, users can add the store through the "Add Store" form.

### Editing and Deleting Recommendations
- Only the authenticated user who added a root beer can edit or delete their recommendations.

### Favorites
- Users can "favorite" a root beer, and then filter to view only root beers they've favorited.

### Filtering
- Users can filter root beers they have recommended.

### Root Beer Ranker
- A root beer ranking feature ranks root beers based on the number of users who have favorited them in a table.

## How to Use

1. Visit the Root Beer Recommend App at [https://rootbeerrecommend.com/](https://rootbeerrecommend.com/).

2. Sign in using Firebase Authentication to access the app's features.

3. Explore the community of recommended root beers.

4. Recommend your favorite root beers through the recommend form, associating them with stores as needed.

5. Edit or delete your own root beer recommendations.

6. Favorite root beers you love and filter to view only your favorites.

7. Filter to view root beers you have recommended.

8. Check out the root beer ranker to see which root beers are the most popular among users.

## Video Walkthrough

[Add a Loom walk-through video here]

## Deployment

The Root Beer Recommend App is deployed on Netlify and can be accessed at [https://rootbeerrecommend.com/](https://rootbeerrecommend.com/).

## Development

If you want to run the app locally or contribute to its development, follow these steps:

1. Clone the repository: `git clone [repository URL]`

2. Install dependencies: `npm install`

3. Configure Firebase:
   - Set up a Firebase project.
   - Add Firebase configuration to your app.
   - Set up Firebase Realtime Database and Authentication.

4. Start the development server: `npm run dev`

5. Open your browser and go to [http://localhost:3000/](http://localhost:3000/) to view the app locally.

## Credits

This app was created by Jared Anderson.

## License



Enjoy exploring and recommending your favorite root beers with Root Beer Recommend!
