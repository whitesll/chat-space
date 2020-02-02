$(function(){ 
  function buildHTML(message){
   if ( message.image ) {
     var html =
      `<div class="message" data-message-id=${message.id}>
         <div class="message-list__area">
           <p class="message-list__area__name">
             ${message.user_name}
           </p>
           <p class="message-list__area__date">
             ${message.created_at}
           </p>
         </div>
         <div class="message-text">
           <p class="message-text__text">
             ${message.content}
           </p>
         </div>
         <img src=${message.image} >
       </div>`
     return html;
   } else {
     var html =
      `<div class="message" data-message-id=${message.id}>
         <div class="message-list__area">
           <p class="message-list__area__name">
             ${message.user_name}
           </p>
           <p class="message-list__area__date">
             ${message.created_at}
           </p>
         </div>
         <div class="message-text">
           <p class="message-text__text">
             ${message.content}
           </p>
         </div>
       </div>`
     return html;
   };
 }
$('#new_message').on('submit', function(e){
 e.preventDefault();
 var formData = new FormData(this);
 var url = $(this).attr('action')
 $.ajax({
   url: url,
   type: "POST",
   data: formData,
   dataType: 'json',
   processData: false,
   contentType: false
 })
  .done(function(data){
    var html = buildHTML(data);
    $('.message-list').append(html);      
    $('form')[0].reset();
    $('.message-list').animate({ scrollTop: $('.message-list')[0].scrollHeight});
    $('.btn').prop('disabled', false);
  })
  .fail(function() {
    alert("メッセージ送信に失敗しました");
  });
})
});