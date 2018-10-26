# API overview

Let's walk through core API concepts as we tackle some everyday use cases.

The Flipbase API enables access to resources like `organizations`, `collections` and `videos`.

`Videos` contain all the metadata that is necessary to playback the video using the Player application or to search and manage the video.

`Collections` are a structural concept that helps you to configure multiple types of videos meant for multiple use cases. Collections determine how videos can be recorded, accessed, managed and played.

`Organizations` are a means of structuring collections and videos. If you like you can create multiple `Organizations` for single customer; or if it suits your use case better you can create a single Organization for all your customers.

The `User API` enables you to manage a user profile and the associated organizations.

The `Members API` enables you to manage add and remove users as members of an existing organization.

No matter which implementation path you choose, you always need to have a `recorder_id` and `player_id` before you implement the recorder and player applications.
