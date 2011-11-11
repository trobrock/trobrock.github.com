(function($){

  window.addEvent('domready', function(){
    var headerBackground = $("header-background");
    var animationHasRan = (Cookie.read('animationHasRan') === "true");
    if (headerBackground && !animationHasRan) {
      headerBackground.set('morph', { unit: '%', duration: 1000, transition: 'quint:in' });
      headerBackground.morph({ width: '100%' });
      Cookie.write('animationHasRan', "true");
    } else {
      headerBackground.setStyle('width', '100%');
    }
  });

}(document.id))
