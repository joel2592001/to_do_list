import React, { useState } from 'react'
import { TextInput, TouchableOpacity, StyleSheet,Text,View, ScrollView, Modal,ToastAndroid, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';


export default function Test(){

  const [values,setvalues] = useState({name:'',id:''})
  //const [place,setplace] = useState({name:'',id:''})
  const [dataArray, setDataArray] = useState([]);
  const [modal,setmodal] = useState(false)
  const [editid,seteditid] = useState('')
  const [editItem,setEditItem]= useState({name:'',id:''})

  const validate=()=>{
    
  }
    
  const add = () => {
    const updatedArray = [...dataArray, values];
    if(values.name.length >= 4){
        setDataArray(updatedArray);
    }
    else{
        ToastAndroid.show('Name must be four ', ToastAndroid.LONG);
    }
    setvalues({name:'',id:''})
  }
  const fun = (id) =>{
    Alert.alert('Delete','Are you sure you want to delete',[
        {text:'Yes',onPress:(id) => {
            const deleteArray = dataArray.filter((item) => item.id !== id);
            setDataArray(deleteArray) 
          }},
        {text:'No',style: "cancel",}
    ])
  }
  //const dele = 

  const edit=()=>{
    let editarray = dataArray.map((ele,ind)=>{
        if(ind == editid){
            //console.log(editItem.name)
            return {...dataArray,name:editItem.name,id:editItem.id}
        }
        return ele
    } )
    //console.log(editarray)
    setDataArray(editarray)
  }
  const putvalue=(ele,ind)=>{
    setEditItem({name:ele.name,id:ele.id})
    setmodal(true);
    seteditid(ind)
  }
  //console.log(place.name)
    return(
        <>
        <Modal animationType="slide" transparent={true} visible={modal}>
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <View style={styles.inputfield}>
                        <TextInput  placeholder='Enter Name' value={editItem.name} onChangeText={(e)=>setEditItem({...editItem,name:e})}/>
                    </View>
                    <View style={styles.inputfield}>
                        <TextInput  placeholder='Enter ID' value={editItem.id} keyboardType='numeric' onChangeText={(e)=>setEditItem({...editItem,id:e})}/>
                    </View>
                    <View style={{flexDirection:'row',gap:10}}>
                        <TouchableOpacity style={styles.btn} onPress={()=> {edit();setmodal(false)}}><Text>Update</Text></TouchableOpacity>
                        <TouchableOpacity style={styles.btn} onPress={()=> setmodal(false)}><Text>Close</Text></TouchableOpacity>
                    </View>
                </View>
            </View> 
        </Modal>
        
        <View style={styles.list}>
        <ScrollView>
            {dataArray.map((data,index) => {
                return (
                    <View key={index} style={styles.card}>
                        <View style={{flexDirection:'column',}}>
                            <TouchableOpacity onPress={() => fun(data.id)}>
                                <Icon name="trash" size={24} color="black" />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={putvalue.bind(this,data,index)}>
                                <Icon name="edit" size={24} color="black" />
                            </TouchableOpacity>
                        </View>
                        <View style={{width:'85%'}}>
                            <Text>Name : {data.name}</Text>
                            <Text>ID : {data.id}</Text>
                        </View>
                    </View>
                );
                })}
        </ScrollView>
        </View>
        
        <View style={styles.input}>
            <View style={{flexDirection:'column',padding:10}}>
                <View style={styles.inputfield}>
                    <TextInput placeholder='Enter the Name' value={values.name} onChangeText={(e) => setvalues({...values,name:e})}/>
                </View>
                <View style={styles.inputfield}>
                    <TextInput   placeholder='Enter the EmployeeID' keyboardType='numeric' value={values.id} onChangeText={(e) => setvalues({...values,id:e})}></TextInput>
                </View>
            </View>
            <TouchableOpacity style={styles.plusbutton} onPress={add}><Text style={{fontSize:40,}}>+</Text></TouchableOpacity>
        </View>
        </>
    );
}

const styles = StyleSheet.create({
    list:{
        flex:3,
        backgroundColor:'white',
        flexDirection:'column',
        //paddingTop:20,
        //paddingLeft:8,
        //paddingRight:5,
        elevation:10,
        alignItems: 'center',
        //alignContent:'center',
        justifyContent: 'center',
        width:'95%',
        height: '100%',
        marginBottom:3,
        marginTop:40,
        borderRadius:20,
    },
    card:{
        backgroundColor:'white',
        borderRadius:20,
        alignItems:'center',
        flexDirection:'row-reverse',
        padding:15,
        elevation:9,
        //paddingLeft:30,
        //paddingBottom:20,
        marginBottom:4,
        width:'96%',
        marginLeft:4,
        marginRight:6,
        marginBottom:6,
        marginTop:15,
    },
    input:{
        flex:1,
        backgroundColor:'white',
        borderRadius:20,
        elevation:10,
        width:'95%',
        flexDirection : 'row',
        justifyContent:'center',
        alignItems:'center',
        margin:9,
    },
    inputfield:{
        backgroundColor:'white',
        justifyContent:'center',
        elevation:10,
        alignItems:'center',
        height:45,
        width:170,
        margin:3,
        // paddingRight:5,
        // paddingLeft:10,
        // paddingBottom:5,
        borderRadius:20
    },
    plusbutton:{
        backgroundColor: 'white',
        elevation:5,
        borderRadius: 30,
        paddingLeft:15,
        paddingRight:15,
        justifyContent:'center',
        alignItems:'center',
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
        
    },
    modalView: {
        margin: 20,
        backgroundColor: 'lightgrey',
        borderRadius: 20,
        alignItems:'center',
        justifyContent:'center',
        width:'80%',
        height:'40%',
        padding: 35,
        alignItems: 'center',
        elevation: 9,
    },
    btn:{
        backgroundColor:'white',
        height:40,
        width:70,
        borderRadius:20,
        alignItems:'center',
        justifyContent:'center',
        marginTop:20,
        elevation:9,
    }
});