<template>
    <form class="container col-lg-12 col-sm-6 d-flex">
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
        <!-- Warning popup -->
        <!-- <div v-if="isPopupVisible">
                  <div  class="popup row ">
                    <div class="col-12">
                      <p class="col-8 wrongInfosText ">မှားယွင်းနေသော ကိုယ်ရေးကိုယ်တာ အချက်အလက်များအား ပြန်လည်ပြင်ဆင်ရန် တာဝန်ရှိသူအား အကြောင်းကြားပါ။</p>
                    </div>
                    <div class="col-12 ">
                       <button class="col-6 text-center wrongInfoBtn btn bg-info" @click="hidePopup">OK</button>
                    </div>
                  </div>
        </div> -->
    </form>
</template>

<script>
import { ref } from 'vue';
import { db, timestamp,storage } from '../firebase/config';

    export default{
        setup(){
            let nameDisplay = localStorage.getItem("useraccount");
            let guideText = ref('ဓာတ်ပုံရွေးချယ်ရန်နှိပ်ပါ');
            let bgColor = ref('#007bff');
            let message = ref('');
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
               
                let chat = {
                    name:nameDisplay,
                    message:message.value,
                    // created_at:timestamp()
                    
                }  
                console.log("Chat Info =>", chat);
         
                // await addDoc(chat);
                const chatRef = db.collection('chats').doc(nameDisplay);
                chatRef.get()
                .then((doc)=>{
                    if(doc.exists){
                        const existingMessages = doc.data().messages || [];
                        existingMessages.push(chat);
                        
                        return chatRef.update({
                            messages:existingMessages
                        });
                    }else{
                            return chatRef.set({
                            messages: [chat]
                        });
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
                message,
                handleImageChange,
                handleSubmit,
                sendImage,
                guideText,
                bgColor
            }
        }
    }
</script>

<style scoped>
    .container{
        padding: 1rem 1.5rem;
        /* background-color: #tomato; */
        border: 3px solid #007bff;
        border-radius: 15px;
        bottom: 1rem;
        position: fixed;
        left: 50%;
        transform: translate(-50%);
    }

    .imageSend{
        height: 3rem;
    }

    .imageSelector{
        display: none;
    }
    .photoChooseBtn{
        font-size: 12px;
        cursor: pointer;
        padding: 20px 20px;
        margin-right: 20px;
       
        color: #fff;
        border-radius: 12px;

        position: relative;
    }

    .photoChooseBtn font-awesome-icon{
        /* margin-right: 0; */
        /* position: absolute;
        left: 0;
        right: 100%; */

    }

    .imageSendBtn{
        width: 20px;
        height: 30px;
    }

    .sendImageSection{
        margin-left: 0;
        /* margin: auto; */
    }

    .imageSendBtn button{
       margin-right: 0;
       margin-left: 1rem;
        border: none;
        outline: none;
        border-radius: 5px;
        background-color: #007bff;
        color: #fff;
        font-size: 12px;
        padding: 10px 14px;
    }

    .sendIcon{
        font-size: 14px;
        padding: 10px 12px;
        background-color: #007bff;
        color: #fff;
        border-radius: 6px;
    }


    textarea{
        color: #000;
        background-color: #a7adba;
        width: 100%;
        height: 1rem;
        max-width: 100%;
        margin-bottom: 6px;
        /* padding: 20px; */
        padding: 20px 10px;
        box-sizing: border-box;
        border: 1px solid #999;
        border-radius: 12px;
        font-family: inherit;
        font-size: 12px;
        flex: 1;
        resize: none;
        line-height: 1;
    }

    @media (max-width: 768px) {
    .imageSendBtn button {
      font-size: 10px; /* Adjust the font size for mobile screens as needed */
      padding: 5px 10px;
      margin-right: 0;
    }

    .photoChooseBtn{
        font-size: 10px;
         padding: 20px 20px;
        margin-right: 0px;
    }
   
  }

    
</style>