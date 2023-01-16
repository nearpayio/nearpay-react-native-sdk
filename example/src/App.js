import React, { Component, Props } from 'react';

import { Button, StyleSheet, View, } from 'react-native';
import { initialize,purchase, refund, reconcile, reverse, logout, setup,Environments, AuthenticationType,Locale  } from 'react-native-nearpay-plugin';
import Toast from 'react-native-toast-message';

let authValue = "nearpay@nearpay.io";
// userenter,email,mobile,jwt
let authType = AuthenticationType.email;
//Time out n seconds
let timeout = "60";
export default class App extends Component {


  constructor(props){  
    super(props); 
    this.state = {
      loggedIn: false,
      currentState: "not-panic",

    }
    console.log(Locale.default,"initializing",Environments.sandbox);
    initialize(Locale.default,Environments.sandbox,authType, authValue).then((response) => {
      let resultJSON = JSON.parse(response)
      console.log(resultJSON.message,",,,,data....",resultJSON.status);
      if(resultJSON.status == 200){
        this.showToast('success','initializ Success',resultJSON.message )
      }else{
        this.showToast('error','initializ Failed',resultJSON.message )
      }

    });
  }

  showToast(type,title, message){
    Toast.show({
      type: type,
      text1: title,
      text2: message
    });
  }

  initiatePurchase(amount , customerRefID, isUiEnabled,isEnableReverse,timeout,authType, authValue ){
    console.log("initializePayment","response");
    purchase(amount,customerRefID,isUiEnabled,isEnableReverse, timeout,authType, authValue).then((response) => {
      let resultJSON = JSON.parse(response);
      console.log(resultJSON,"initializePayment",resultJSON.message);
      if(resultJSON.status == 200){
        this.showToast('success','Purchase Success',resultJSON.messsage );
      }else{
        this.showToast('error','Purchase Failed',resultJSON.message );
      }

    });
  }

  initiatePurchaseAndRefund(amount , customerRefID, isUiEnabled,isEnableReverse,isEditableReversalUI,timeout,authType, authValue ){

    purchase(amount,customerRefID,isUiEnabled,isEnableReverse,timeout,authType, authValue).then((response) => {
      var responseJson = JSON.parse(response);
      var status = responseJson.status;
      var message = responseJson.message;
      if(status == 200){
          var purchaseList = responseJson.list;
          setTimeout(() => {
            console.log(purchaseList.length,"paymentresponse",purchaseList);
            if(purchaseList.length){
              let uuid = purchaseList[0].uuid;
              console.log("response list", uuid);
              this.initiateRefund("0001",uuid,"test1234567888",isUiEnabled,isEnableReverse,isEditableReversalUI,timeout,authType, authValue);
            }
          }, 5000);
      }else{
        this.showToast('error','Purchase Failed',responseJson.message );
      }
      console.log("initialisePayment",response);
    });
  }

  initiateRefund(amount , transactionUuid ,customerRefNo, isUiEnabled,isEnableReverse,isEditableReversalUI,timeout,authType, authValue ){
    refund(amount,transactionUuid,customerRefNo,isUiEnabled,isEnableReverse,isEditableReversalUI,timeout,authType, authValue).then((response) => {
      console.log("initializePayment",response);
      var resultJSON = JSON.parse(response);
      if(resultJSON.status == 200){
        this.showToast('success','Refund Success',resultJSON.message )
      }else{
        this.showToast('error','Refund Failed',resultJSON.message )
      }
    });
  }

  initiateReconcile(isUiEnabled,timeout,authType, authValue ){
    reconcile(isUiEnabled,timeout,authType, authValue).then((response) => {
      console.log("initialisePayment",response);
      var resultJSON = JSON.parse(response);
      if(resultJSON.status == 200){
        this.showToast('success','Reconcile Success',resultJSON.message )
      }else{
        this.showToast('error','Reconcile Failed',resultJSON.message )
      }
    });
  }

  initiatePurchaseAndReverse(amount , customerRefID, isUiEnabled,isEnableReverse,timeout,authType, authValue ){

    purchase(amount,customerRefID,isUiEnabled,isEnableReverse,timeout,authType, authValue).then((response) => {
      print("....initiatePurchaseAndReverse....$response",response);
      var responseJson = JSON.parse(response);
      var status = responseJson.status;
      var message = responseJson.message;
      if(status == 200){
          var purchaseList = responseJson.list;
          setTimeout(() => {
            console.log(purchaseList.length,"paymentresponse",purchaseList);
            if(purchaseList.length){
              let uuid = purchaseList[0].uuid;
              console.log("...response list...uuid------$uuid..333..", uuid);
              this.doReverse(uuid,isUiEnabled,timeout,authType, authValue);
            }
          }, 5000);
      }else{
        this.showToast('error','Purchase Failed',responseJson.message );
      }
      console.log(".....initialisePayment......44.......",response);
    });
  }


  doReverse( transactionID , isUiEnabled, timeout,authType, authValue ){
    reverse(transactionID, isUiEnabled, timeout,authType, authValue).then((response) => {
      console.log("initialisePayment",response);
      var resultJSON = JSON.parse(response);
      if(resultJSON.status == 200){
        this.showToast('success','Reverse Success',resultJSON.message )
      }else{
        this.showToast('error','Reverse Failed',resultJSON.message )
      }
    });
  }

  doLogout(){
    logout().then((response) => {
      console.log("doLogoutAction",response);
      var resultJSON = JSON.parse(response);
      console.log("doLogoutAction",resultJSON.message);
      if(resultJSON.status == 200){
        this.showToast('success','Logout Success',resultJSON.message )
      }else{
        this.showToast('error','Logout Failed',resultJSON.message )
      }
    });
  }

  doSetupClick(){
    setup(authType, authValue).then((response) => {
      console.log("doSetupClick",response);
      var resultJSON = JSON.parse(response);
      if(resultJSON.status == 200){
        this.showToast('success','Setup Success',resultJSON.messsage )
      }else{
        this.showToast('error','Setup Failed',resultJSON.messsage )
      }
    });
  }

  render() {
    return (
      <View style={styles.container}>
            <View style={styles.containerrow}>
                <Button title="Purchase" onPress={()=>this.initiatePurchase("0001","test123456",true,true,timeout,authType, authValue)}/>
              </View>
              <View style={styles.containerrow}>
                <Button title="Purchase and Refund " onPress={()=>this.initiatePurchaseAndRefund("0001","test12464545456",true,true,true,timeout,authType, authValue)}/>
              </View>
              <View style={styles.containerrow}>
                <Button title="Purchase and Reverse " onPress={()=>this.initiatePurchaseAndReverse("0001","test12464545456",true,true,timeout,authType, authValue)}/>
              </View>
              <View style={styles.containerrow}>
                <Button title="Reconcile" onPress={()=>this.initiateReconcile(true,timeout,authType, authValue)}/>
              </View>
              <View style={styles.containerrow} >
                <Button title="Setup" onPress={()=>this.doSetupClick()} />
              </View>
              <View style={styles.containerrow} >
                <Button title="Logout" onPress={()=>this.doLogout()} />
              </View>
            <Toast />

            </View>
    )
  }

}

const styles = StyleSheet.create({

  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
},
containerrow: {
  flexDirection: 'row',
  //marginBottom : 10,
  marginBottom:'5%'
},
buttonContainer: {
    flex: 1,
}
});
