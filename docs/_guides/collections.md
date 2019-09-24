## Create an collection

A Collection is nothing more and nothing less then a group of videos that share the same configuration. You can alter the security, privacy and retention settings of a Collection as documented below.

### Security

##### recorder_id

The recorder_id is a globally unique UUID used by the Recorder application to link videos to a Collection.

##### player_id

The player_id is a globally unique UUID used by the Player to check whether or not a requested video ID belongs to a Collection.

##### Secure playback (secure_mode)

Theoretically it is possible to brute force UUID's. As a result it is possible that an attacker can 'guess' a video UUID and a player_id and thus access a video. So prevent this we have added a `secure_mode` property on a Collection. When this property is set to `true` all videos need to be authenticated using a signature. When set to 'true' the Player application requires  `data-signature` property to be added the HTML elements, to be able to load videos files. Read more about signatures in the [guide how to use the Player application](player/docs.html#secure-mode) you can read more about this.

### Data retention

##### Disable automatically archiving (disable_auto_archiving)

By default all videos will be archived according to the `delete_after_days` property. If you want to prevent videos from being automatically archived set the `disable_auto_archiving` property to `true`. Default is `false`.

##### Archive videos # days after creation (delete_after_days)

All videos in a collection by default will inherit the retention period from the collection. By default the retention period is 365 days. So, 1 year after a videos is created it will be archived. If you want to change the default retention period you can use the `delete_after_days` property on a collection. If you want to prevent videos from being automatically archived, `disable_auto_archiving` option.

##### Permanent archiving (permanent_delete_after)

To prevent from accidental data loss we do not delete all video files instantly. In stead, we make videos files inaccessible for a (default) period of 7 days. From the point you have 'deleted' a video all applications will behave as the video indeed was deleted. After 7 days we will permanently delete the video files. If you want to alter when videos are permanently deleted you can use `permanent_delete_after` property.

##### Delete unconfirmed videos (delete_unconfirmed_after_days)

Video's that are not confirmed will be automatically archived after the number of days configured in the `delete_unconfirmed_after_days` property. Default is 3. When require_confirmations is so to `false` this setting will be ignored.

### Privacy

##### Subject approval (require_confirmations)

In the context of the GDPR it might be required to add an additional check whether or not Flipbase is allowed to process and store a video. As a resolution we have added the `require_confirmations` property to a collection. When you enable this (set to `true`) videos it is you as a implementation partner a video can confirm videos using an API request. Video's you have not confirmed will be automatically archived after the number of days configured in the `delete_unconfirmed_after_days` property (default is 3 days).

##### Authentication required? (allowed_privacy)

Whether videos in this collection are allowed to be publicly accessible or not. Private videos require the user to be authenticated to view the video. Public videos do not require any form off authentication and are assumed to be allowed to share with everyone. Default is `private`.

All videos created in an Collection will inherit the privacy setting.

### Generic settings

##### recorder_output

By default the recorder will return a UUID that reference a video. However, it might be practical if you want to get an URL which can you can place in an iframe (the `embed_url`) or a URL that you want to share on social media (the `share_url`).

##### Name

Name of your collections; might come in handy when you need to browse through a list of Collections.

##### Descriptions

Description of what kind of videos the Collection contain (or what the purpose is with the video).
