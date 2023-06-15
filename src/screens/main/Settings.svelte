<script lang="ts">
  import { auth } from "~/firebase/config";
  import { signOut } from "firebase/auth";
  import { db } from "~/firebase/config";
  import { collection, doc, getDoc, updateDoc} from "firebase/firestore";
  import { onMount } from "svelte";
  import { fly } from "svelte/transition";
  import { duration } from "~/lib/stack-router/constants";

  let userName;
  let userPhotoURL;
  let openModal = false;
  let newNameValue = ''
  let userNameChanged = false

  function notifyMe() {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('sw.js');
    }
    Notification.requestPermission(function(result) {
    if (result === 'granted') {
        navigator.serviceWorker.ready.then(function(registration) {
        registration.showNotification('Notification with ServiceWorker');
        });
    }
    });
  }
  async function getUserData() {
    try{
        const docRef = doc(db,'users',auth.currentUser.uid);
        const docSnap = await getDoc(docRef)
        userName = docSnap.data().nickname
        userPhotoURL = docSnap.data().photoURL
        
    
    } catch(err){
        console.log(err)
    } 
  }

  async function changeUsername(e) {
    e.preventDefault()
    const docRef = doc(db,'users',auth.currentUser.uid);
    await updateDoc(docRef, {
        nickname: newNameValue
    })
    userNameChanged = true
    setTimeout(() => {
        userNameChanged = false
        openModal = false
        newNameValue = ''
    }, 3000)
    getUserData()
  }


  onMount(() => {
    getUserData()
  })
  
</script>

<main>
    <div class="top-container">
        <div class="top-info">
            <div class="name-info">
                <img src={userPhotoURL} alt="userImage">
                <div class="name-text">
                    <h2>{userName}</h2>
                    <h4>Sprint is really good application!</h4>
                </div>
                
            </div>
            <div class="btn-container">
                <button class="btn btn-white" on:click={() => {openModal = true}}>Change name</button>
                <button class="btn" on:click={() => signOut(auth)}>Sign out</button>
            </div>
            {#if openModal === true}
            <div class="changeName" transition:fly={{y: "-40%", opacity: 0.1, duration}}>
                <form on:submit={(e) => changeUsername(e)}>
                    <input type="text" placeholder="change nickname" bind:value={newNameValue} required>
                    <button type="submit">Submit</button>
                </form>
                {#if userNameChanged}
                <div class="successMessage" transition:fly={{y: "-10%", opacity: 0.1, duration}}>
                    Username Changed!
                </div>
                {/if}
            </div>
            {/if}
            <button class="btn" on:click={() => {notifyMe()}}>notify</button>
           
        </div>

        
        
    </div>
    
</main>

<style>
    /* main {
        padding: var(--header-h) 0 0;
    } */
    .changeName {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        width: 100%;
        gap: 12px;
    }
    .changeName form {
        display: flex;
        gap: 12px;
    }
    .successMessage {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0 20px;
        width: 100%;
        border-radius: 18px;
        display: flex;
        background: #313131;
        height: 44px;
        color: #e2e2e2;

    }
    .changeName input {
        flex-grow: 2;
        flex-shrink: 2;
        height: 44px;
        background-color: #05060f0a;
        border-radius: 18px;
        padding: 0 1rem;
        border: 2px solid transparent;
        font-size: 1rem;
    }
    .changeName button {
        color: white;
        height: 40px;
        background-color: #000;
        border-radius: 18px;
        padding: 0 1rem;
        border: 2px solid transparent;
        font-size: 1rem;
    }
    .name-info {
        display: flex;
        flex-direction: row;
        align-items: center;
        width: 100%;
        gap: 10px;
    }
    .name-text {
        display: flex;
        flex-direction: column;
        gap: 4px;
    }
    .name-text h4 {
        color: #797979;
    }

    img {
        border-radius: 50%;
        width: 100px;
        height: 100px;
    }
    .btn-container {
        width: 100%;
        display: flex;
        flex-direction: row;
        gap: 20px;
    }
    .top-container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 100%;
    }
    .top-info {
        display: flex;
        flex-direction: column;
        width: 100%;
        background: #F8F8F8;
        justify-content: center;
        align-items: center;
        padding: 20px;
        border-radius: 18px;
        gap: 10px;
    }
    .btn {
        width: 40%;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 16px;
        flex-shrink: 1;
        background: #000;
        color: #FFF;
        font-weight: 500;
        font-size: 16px;
        text-decoration: none;
        border-radius: 20px;
    }
    .btn-white {
        background: #E8E8E8;
        color: #000;
    }
    

    
</style>
