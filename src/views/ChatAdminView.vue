<template>
    <!-- <Navbar></Navbar> -->
     <!-- top navbar -->
    <Navbar></Navbar>
   <div class="d-flex">
   
    <div class="chatHistory col-2 ">
        <h6 class="submittedList">Submited Employees List</h6>
        <div class="col-9 chattedUsers" v-for="chatId in messageHistory" :key="chatId" @click="fetchSingleUser(chatId)">
            {{ chatId }}
        </div>
        <div>
            <p>{{ nouser }}</p>
        </div>
    </div>
    <div class="chat_window col-10">
        <div class="messagess" ref="msgBox">
            <div class="single" v-for="message in messages" :key="message.id">
              <!-- <span class="message text-justify">{{ message.message }}</span>   -->
              <template v-if="isImage(message.message)">
             <span> <a :href="message.message" target="_blank" class="file-link">ပုံကိုကြည့်ရှုရန် နှိပ်ပါ</a></span>
            </template>
            <template v-else>
              <span class="message text-justify">{{ message.message }}</span>
            </template>
              <span class="name mt-1
              ">{{ message.name }}</span>
              <span class="created_at">{{ message.created_at }}</span>
            </div>
           
        </div>
    </div>
   </div>
    <!-- <form class="container col-lg-6 col-sm-4 d-flex">
        <textarea class="col-9 chatBox" placeholder="Enter Message" v-model="message" @keypress.enter="handleSubmit"></textarea>
        <div class="col-1 mt-3 ms-2" @click="handleSubmit">
            <span class="sendIcon"><font-awesome-icon icon="fa-solid fa-paper-plane" /></span>
        </div>
    </form> -->
    <form class="container col-lg-6 col-sm-6 d-flex">
       <div class="col-12">
        <div class="col-12 d-block imageSend">
          <div class="d-flex">
            <div class="col-8 sendImageSection">
                <label for="imageInput" class="plus-button plus_button d-flex">
                    <!-- <font-awesome-icon icon="fa-solid fa-plus" size="lg" />  -->
                    <span class="photoChooseBtn" :style="{ backgroundColor: bgColor }">{{ guideText }}</span>
                </label>
                <input type="file" ref="imageInput" class="imageSelector" id="imageInput" @change="handleImageChange" />
            </div>
            <div class="col-4  imageSendBtn">
                <button type="button" class="btn" @click="sendImage">ဓာတ်ပုံပိုရန်</button>
            </div>
          </div>
        </div>
       <div class="col-12 d-block d-flex">
        <textarea class="col-8 chatBox" placeholder="စာရိုက်ထည့်ရန်" v-model="message" @keypress.enter="handleSubmit"></textarea>
            <div class="col-1 mt-3 ms-2" @click="handleSubmit">
                <span class="sendIcon"><font-awesome-icon icon="fa-solid fa-paper-plane" /></span>
            </div>
       </div>
       </div>
     
    </form>
</template>

<script>
import Navbar from '@/components/Navbar.vue';
import { db, timestamp,storage } from '../firebase/config';
import { computed, onUpdated, ref } from 'vue';
import { getUnixTime } from 'date-fns';
// import chat from '@/store/chat';
export default{
        components:{
            Navbar,
        },
        setup(){
            let dynamicId = ref('');
            let messageHistory = ref([]);
            let nouser = ref('');
            let nameDisplay = localStorage.getItem("useraccount");
            let message = ref('');

            let fetchHistory = ()=>{
           
                db.collection('chats').get()
                .then((querySnapshot)=>{
                    let chattedId = [];
                    
                    querySnapshot.forEach((doc)=>{
                        console.log(doc.id, '=>', doc.data());
                        chattedId.push(doc.id);
                        messageHistory.value = chattedId;
                    });
                    console.log("Chatted History ==>", chattedId);
                    console.log("Chatted History in ref ==>", messageHistory.value);
                })
                .catch((error)=>{
                    console.log("Error Occur", error)
                });
            }

            let fetchSingleUser = async(chatId)=>{
                dynamicId.value = chatId;
                
                console.log("Dynamic Id value =>", dynamicId.value)
                const chatsRef = db.collection('chats').doc(chatId);
                try{
                    const doc = await chatsRef.get();
                    if(doc.exists){
                        // console.log("Messages from Employees =>", doc.data());
                        console.log("Messages from Employees =>", chatId);
                    }else{
                        nouser.value = "There Is No Grievance Form"
                    }
                }catch(err){
                console.log("Error =>", err);
            }
            fetchMessages(chatId);

                // console.log("Let's go to single user", chatId);
            }
            fetchHistory();
// CHAT WINDOW 
            let messages = ref([]);
            let msgBox = ref(null);
            
          onUpdated(()=>{
            msgBox.value.scrollTop = msgBox.value.scrollHeight
          })

          const isImage = (content) => {
          return content.startsWith('http') || content.startsWith('https');
        };

          let fetchMessages = async() =>{
           if(dynamicId.value === ''){
                console.log("Nothing to show");
           }else{
            const chatRef = db.collection('chats').doc(dynamicId.value);
            try{
              const doc = await chatRef.get();
              if(doc.exists){
                const data = doc.data();
                messages.value = data.messages || [];
                console.log("Messages from User2 =>", messages.value);
              }else{
                console.log("No messages");
              }
            }catch(error){
              console.log("Error =>", error)
            }
           }
          }
          fetchMessages();
          let guideText = ref('ဓာတ်ပုံရွေးချယ်ရန်နှိပ်ပါ');
            let bgColor = ref('#007bff');
          let imageFile = ref(null);
            let handleImageChange = (event) =>{
                imageFile.value = event.target.files[0];
                console.log("Image value =>", imageFile.value);
                console.log("Image value type=>", typeof(imageFile.value));
                if(imageFile.value){
                    guideText.value = "ဓာတ်ပုံရွေးချယ်ပြီးပါပြီ";
                    bgColor.value = "#198754";
                }
            }
            const sendImage = async()=>{
                if(!imageFile.value){
                    return;
                }
                const storageRef = storage.ref();
                const imageRef = storageRef.child(imageFile.value.name);
                await imageRef.put(imageFile.value);

                const imageUrl = await imageRef.getDownloadURL();
                console.log("Image File URL =>", imageUrl);
                console.log("Image File URL Type=>", typeof(imageUrl));

                let chat = {
                    name:nameDisplay,
                    message:imageUrl
                }
                console.log("Image Chat info =>",chat);
                let imgChatRef = db.collection('chats').doc(nameDisplay);
                imgChatRef.get()
                .then((doc)=>{
                    if(doc.exists){
                        const existingMessages = doc.data().messages || [];
                        existingMessages.push(chat);
                        return imgChatRef.update({
                            messages:existingMessages
                        })
                    }
                    console.log("Document Successfully Written");
                })

            }
           
           
            let handleSubmit =async () =>{
                // FUNCTION TO CHANGE TIMESTAMP TO FORMATTED DATE 
                // const formatDate = (timestamp) => {
                // if (timestamp) {
                //     const unixTimestamp = getUnixTime(timestamp.toDate());
                //     return new Date(unixTimestamp * 1000).toLocaleString(); // Convert to milliseconds
                // }
                // console.log(new Date());
                // return "";
                // };
              
                let chat = {
                    name:nameDisplay,
                    message:message.value,
                    // created_at:messagedTime
                }  
                console.log("Chat Info =>", chat);
                const chatRef = db.collection('chats').doc(dynamicId.value);
                chatRef.get()
                .then((doc)=>{
                    if(doc.exists){
                        const existingMessages = doc.data().messages || [];
                        existingMessages.push(chat);
                        
                        return chatRef.update({
                            messages:existingMessages
                        });
                    }else{
                        console.log("Document doesn't exist");
                    }
                    console.log("Document Successfully Written");
                })
                .then(()=>{
                    console.log("Messages Update to doc");
                })
                .catch((error)=>{
                    console.log("Error occur", error);
                })
              
               message.value ='';
            }
            return{
                dynamicId,
               nouser,
                messageHistory,
                fetchHistory,
                fetchSingleUser,
                messages,
            msgBox,
            fetchMessages,
            message,
            handleSubmit,
            isImage,
            guideText,
                bgColor,
                sendImage,
                handleImageChange
            }

        }
    }
</script>

<style scoped>
     .chatHistory{
        margin-top: 2rem;
        margin-left: 5rem;
        margin-right: 1rem;
        background-color: #fafafa;
        height: 80vh;
        border: 3px solid #007bff;
        border-radius: 15px;
    }

    .chattedUsers{
        font-size: 14px;
        color: #fff;
        margin: auto;
        /* width: 12rem; */
        border-radius: 10px;
        background-color: #007bff;
        cursor: pointer;
        margin-bottom: 5px;
        padding: 5px 10px;
    }

    .chat_window {
    background: #fafafa;
    padding: 30px 20px;
    margin-left: 2rem;
  }
  .single {
    margin: 18px 0;
  }
  .created_at {
    display: block;
    color: #999;
    font-size: 10px;
    margin-bottom: 4px;
    padding-left: 12px;

  }
  .name {
    padding-left: 12px;
    font-weight: bold;
    margin-right: 6px;
    font-size: 12px;
  }
  .messagess {
    max-height: 400px;
    overflow: auto;
    margin-bottom: 5px;
  }
  .message {
    display: block;
    text-align: justify !important;
    font-size: 14px;
    font-weight: bold;
    margin-bottom: 3px;
    padding: 4px 12px;
    border-radius: 5px;
    border: 1px solid transparent;
    background-color: transparent;
    color: #007bff;
  }

  .submittedList{
    text-align: center;
    margin-top: 1rem;
    font-weight: bold;
    font-size: 16px;
    margin-bottom: 1rem;
  }

  /* Media query for mobile screens (up to 768px) */
  @media (max-width: 768px) {
    .name {
      font-size: 12px; /* Adjust the font size for mobile screens as needed */
    }
    .message{
      font-size: 12px;
    }
  }

  .container{
        
        bottom: 1rem;
        position: fixed;
        left: 50%;
        transform: translate(-50%);
    }

    .sendIcon{
        font-size: 18px;
        padding: 10px 12px;
        background-color: #007bff;
        color: #fff;
        border-radius: 6px;
    }



    textarea{
        color: #000;
        background-color: #a7adba;
        width: 100%;
        max-width: 100%;
        margin-bottom: 6px;
        padding: 20px;
        box-sizing: border-box;
        border: 1px solid #999;
        border-radius: 12px;
        font-family: inherit;
        flex: 1;
        resize: none;
        line-height: 1;
    }

    .imageSend{
        height: 3rem;
        /* margin: auto; */
    }

    .imageSelector{
        display: none;
    }

    .imageSendBtn{
        width: 40px;
        height: 30px;
    }

    .imageSendBtn button{
       /* margin-right: -3rem; */
       /* margin-left: 0; */
        border: none;
        outline: none;
        border-radius: 5px;
        background-color: #007bff;
        color: #fff;
        font-size: 12px;
        padding: 10px 14px;
    }


    .photoChooseBtn{
        font-size: 12px;
        cursor: pointer;
        padding: 12px 20px;
        margin-right: 20px;
       
        color: #fff;
        border-radius: 12px;

        position: relative;
    }

    .sendImageSection{
        margin-left: 0;
        margin-right: 4rem;
        /* margin: auto; */
    }

    
</style>