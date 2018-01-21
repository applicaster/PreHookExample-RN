export const iosTranslationMapping = (translations, feedTitle) => ({
  defaultShareMessage: translations.Feed2_ShareEvent.replace('%@', feedTitle) || 'Download the app now!',
  shareTitle: feedTitle || 'Feed',
  replyToTweetScreenTitle: translations.Feed2_ReplyToTweetScreenTitle || 'Reply to Tweet', // needed
  postPlaceholder: translations.Feed2_CreatePostPlaceholder || 'Write a post...',
  postButtonText: translations.Feed2_CreatePostSend || 'Post',
  tweetButtonText: translations.Feed2_CreateTweetSend || 'Tweet',
  writePostScreenTitle: translations.Feed2_WritePostScreenTitle || 'Write a Post',  // needed
  writePostScreenTitleTwitter: translations.Feed2_WriteTweetScreenTitle || 'Post a Tweet',  // needed
  facebookPostErrorTitle: translations.Feed2_AlertFacebookSendFailedTitle || 'Error',
  facebookPostErrorMessage: translations.Feed2_AlertFacebookSendFailedMessage || 'Unable to post to Facebook',
  twitterPostErrorTitle: translations.Feed2_AlertTwitterSendFailedTitle || 'Error',
  twitterPostErrorMessage: translations.Feed2_AlertTwitterSendFailedMessage || 'Unable to post to Twitter',
  alertOk: translations.Feed2_AlertOK || 'Ok',
  dismiss: translations.Feed2_Dismiss || 'Dismiss',
});

export const androidTranslationMapping = (translations, feedTitle) => ({

});

// Feed2_AlertFacebookSendFailedMessage:" Error al publicar"
// Feed2_AlertFacebookSendFailedTitle:" Error:"
// Feed2_AlertOK:" OK"
// Feed2_AlertTwitterSendFailedMessage:" Error al enviar Tweet"
// Feed2_AlertTwitterSendFailedTitle:" Error:"
// Feed2_AlertTwitterSignInRequireMessage:"Por favor, inicia sesión en Twitter y autoriza la aplicación en los ajustes del dispositivo"
// Feed2_AlertTwitterSignInRequireTitle:"Inicio de sesión requerido:"
// Feed2_CancelPhoto:" Cancelar"
// Feed2_CreatePostBack:" Cancelar"
// Feed2_CreatePostPlaceholder:"¿Qué estas pensando?"
// Feed2_CreatePostSend:"Publicar"
// Feed2_CreateTweetSend:"Twittear"
// Feed2_DetailFacebookTitle:"Publicación"
// Feed2_Dismiss:"Dismiss"
// Feed2_NotLoggedInToTwitter:"No puedes mandar tweet de momento. Entra en los ajustes del dispositivo para permitir el acceso."
// Feed2_SendComment:"Publicar"
// Feed2_ShareEvent:" Estoy viendo %@, ¿quieres acompañarme?"
// Feed2_ShareEventFacebook:" Estoy viendo %@, ¿quieres acompañarme?"
// Feed2_ShareEventMail:" Estoy viendo %@, ¿quieres acompañarme?"
// Feed2_ShareEventSMS:" Estoy viendo %@, ¿quieres acompañarme?"
// Feed2_ShareEventTwitter:" Estoy viendo %@, ¿quieres acompañarme?"
// Feed2_ShareEventWhatsApp:" Estoy viendo %@, ¿quieres acompañarme?"
// Feed2_SignInContent:" Para ver más contenido, por favor, inicia sesión"
// Feed2_SubjectShareEvent:"Este contenido ha sido compartido contigo: %@"
// Feed2_TwitterLoginFailed:"Twitter Login Failed"
// Feed2_TwitterSorry:"Sorry!"
// Feed2_TwitterTweetFailed:"Twitter Tweet Failed"
// Feed2_WelcomeSignIn:"Inicia sesión para más actualizaciones y contenido"
// Feed2_WelcomeTitle:"Bienvenido al Feed"
// Feed2_WriteAPostButtonText:"Publicar"
// Feed2_back:" Atrás"

// iOS:
// - DefaultShareMessage
// Subtitle when sharing an event
// - ShareTitle
// Defult text when sharing an event

// ReplyToTweetScreen:
// - Screen Title -> 
// - Text Placeholder -> Text in the 'write a post' page encouraging user to write
// - Button Text -> Publish button on the "write a post" page

// Write a Post Screen:
// - Screen Title -> Title of facebook event detail view
// - Text Placeholder -> Text in the 'write a post' page encouraging user to write
// - Button Text -> Publish button in the "write a tweet" page

// Write a Post Screen for Twitter Only:
// - Screen Title -> 
// - Text Placeholder -> Text in the 'write a post' page encouraging user to write
// - Button Text -> Publish button in the "write a tweet" page


// -------------------------
// - Build Reducer for translations
// - Dispatch action with transaltions
// - Create epic to process translations
// - Process translations for both platforms in epic
// - Dispatch action with processed translations
