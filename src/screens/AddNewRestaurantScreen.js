import React, {useEffect, useState} from 'react';
import { View, Text } from 'react-native';
import { Input, Button } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native'


export default function AddNewRestaurantScreen (){
    // const [restaurantName, setRestaurantName] = useState()
    // const [address, setAddress] = useState()
    // const [photo, setPhoto] = useState()
    // const [rating, setRating] = useState(0)
    const [btnDisabled, setBtnDisabled] = useState(true)

    const[newRestaurant, setNewRestaurant] = useState({})
    
    const navigation = useNavigation();

    // const newRestaurant = {
    //     address: address,
    //     name: restaurantName,
    //     photoURL: photo,
    //     rating: rating,
    // }

    useEffect(() => {
        if(newRestaurant.address && newRestaurant.name && newRestaurant.rating !== undefined){
            setBtnDisabled(false)
        }
    },[newRestaurant])


    const sendNewRestaurantInfo = () => {
        if(newRestaurant.name !== undefined) {
        fetch('https://bocacode-intranet-api.web.app/restaurants', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newRestaurant)
        })
        .then(() => alert('new restaurant added'))
        .then(() => navigation.navigate('Home'))
        .catch(err => console.error(err))
    }
}
        

    return(
        <>
        <View>
            <Text>This is add new restaurant screen</Text>
            <Input 
                placeholder='Restaurant Name' 
                spellCheck 
                onChangeText={userText => setNewRestaurant({...newRestaurant, name: userText})}
            />
            <Input 
                placeholder='Address' 
                onChangeText={userText => setNewRestaurant({...newRestaurant, address: userText})}
            />
            <Input 
                 placeholder='Photo' 
                keyboardType='url' 
                onChangeText={userText => setNewRestaurant({...newRestaurant, photo: userText})}
            />
            <Input 
                 placeholder='Rating' 
                keyboardType='numeric' 
                onChangeText={userText => setNewRestaurant({...newRestaurant, rating: userText})}
            />
            <Button 
            title="Create new restaurant" 
            onPress={sendNewRestaurantInfo} 
            disabled={btnDisabled}
            />
        </View>
        </>
    )
}