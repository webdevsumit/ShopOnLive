import { StyleSheet, Text, ToastAndroid, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import ShopCard from '../components/ShopCard'
import { getNearByShopsAPI } from '../actions/apis';

let sample = [
  {id:1, shopName: 'The Full Name Of The Shop', description: 'The Full Description. But Im sure there is a better way. Also, setUser should be initialized as a function that takes a IUser as input, and returns nothing. Also, worth noting that using const useState without any initialization works fine, but I would like to take advantage of TypeScript to force type checking on init, especially if it depends on some props.', rating: '4.5'},
  {id:2, shopName: 'The Full Name Of The Shop', description: 'The Full Description. But Im sure there is a better way. Also, setUser should be initialized as a function that takes a IUser as input, and returns nothing. Also, worth noting that using const useState without any initialization works fine, but I would like to take advantage of TypeScript to force type checking on init, especially if it depends on some props.', rating: '4.5'},
  {id:3, shopName: 'The Full Name Of The Shop', description: 'The Full Description. But Im sure there is a better way. Also, setUser should be initialized as a function that takes a IUser as input, and returns nothing. Also, worth noting that using const useState without any initialization works fine, but I would like to take advantage of TypeScript to force type checking on init, especially if it depends on some props.', rating: '4.5'},
  {id:4, shopName: 'The Full Name Of The Shop', description: 'The Full Description. But Im sure there is a better way. Also, setUser should be initialized as a function that takes a IUser as input, and returns nothing. Also, worth noting that using const useState without any initialization works fine, but I would like to take advantage of TypeScript to force type checking on init, especially if it depends on some props.', rating: '4.5'},
  {id:5, shopName: 'The Full Name Of The Shop', description: 'The Full Description. But Im sure there is a better way. Also, setUser should be initialized as a function that takes a IUser as input, and returns nothing. Also, worth noting that using const useState without any initialization works fine, but I would like to take advantage of TypeScript to force type checking on init, especially if it depends on some props.', rating: '4.5'},
  {id:6, shopName: 'The Full Name Of The Shop', description: 'The Full Description. But Im sure there is a better way. Also, setUser should be initialized as a function that takes a IUser as input, and returns nothing. Also, worth noting that using const useState without any initialization works fine, but I would like to take advantage of TypeScript to force type checking on init, especially if it depends on some props.', rating: '4.5'},
  {id:7, shopName: 'The Full Name Of The Shop', description: 'The Full Description. But Im sure there is a better way. Also, setUser should be initialized as a function that takes a IUser as input, and returns nothing. Also, worth noting that using const useState without any initialization works fine, but I would like to take advantage of TypeScript to force type checking on init, especially if it depends on some props.', rating: '4.5'},
  {id:8, shopName: 'The Full Name Of The Shop', description: 'The Full Description. But Im sure there is a better way. Also, setUser should be initialized as a function that takes a IUser as input, and returns nothing. Also, worth noting that using const useState without any initialization works fine, but I would like to take advantage of TypeScript to force type checking on init, especially if it depends on some props.', rating: '4.5'},
  {id:9, shopName: 'The Full Name Of The Shop', description: 'The Full Description. But Im sure there is a better way. Also, setUser should be initialized as a function that takes a IUser as input, and returns nothing. Also, worth noting that using const useState without any initialization works fine, but I would like to take advantage of TypeScript to force type checking on init, especially if it depends on some props.', rating: '4.5'},
  {id:10, shopName: 'The Full Name Of The Shop', description: 'The Full Description. But Im sure there is a better way. Also, setUser should be initialized as a function that takes a IUser as input, and returns nothing. Also, worth noting that using const useState without any initialization works fine, but I would like to take advantage of TypeScript to force type checking on init, especially if it depends on some props.', rating: '4.5'},
  {id:11, shopName: 'The Full Name Of The Shop', description: 'The Full Description. But Im sure there is a better way. Also, setUser should be initialized as a function that takes a IUser as input, and returns nothing. Also, worth noting that using const useState without any initialization works fine, but I would like to take advantage of TypeScript to force type checking on init, especially if it depends on some props.', rating: '4.5'},
  {id:12, shopName: 'The Full Name Of The Shop', description: 'The Full Description. But Im sure there is a better way. Also, setUser should be initialized as a function that takes a IUser as input, and returns nothing. Also, worth noting that using const useState without any initialization works fine, but I would like to take advantage of TypeScript to force type checking on init, especially if it depends on some props.', rating: '4.5'},
  {id:13, shopName: 'The Full Name Of The Shop', description: 'The Full Description. But Im sure there is a better way. Also, setUser should be initialized as a function that takes a IUser as input, and returns nothing. Also, worth noting that using const useState without any initialization works fine, but I would like to take advantage of TypeScript to force type checking on init, especially if it depends on some props.', rating: '4.5'},
  {id:14, shopName: 'The Full Name Of The Shop', description: 'The Full Description. But Im sure there is a better way. Also, setUser should be initialized as a function that takes a IUser as input, and returns nothing. Also, worth noting that using const useState without any initialization works fine, but I would like to take advantage of TypeScript to force type checking on init, especially if it depends on some props.', rating: '4.5'},
  {id:15, shopName: 'The Full Name Of The Shop', description: 'The Full Description. But Im sure there is a better way. Also, setUser should be initialized as a function that takes a IUser as input, and returns nothing. Also, worth noting that using const useState without any initialization works fine, but I would like to take advantage of TypeScript to force type checking on init, especially if it depends on some props.', rating: '4.5'},
  {id:16, shopName: 'The Full Name Of The Shop', description: 'The Full Description. But Im sure there is a better way. Also, setUser should be initialized as a function that takes a IUser as input, and returns nothing. Also, worth noting that using const useState without any initialization works fine, but I would like to take advantage of TypeScript to force type checking on init, especially if it depends on some props.', rating: '4.5'},
  {id:17, shopName: 'The Full Name Of The Shop', description: 'The Full Description. But Im sure there is a better way. Also, setUser should be initialized as a function that takes a IUser as input, and returns nothing. Also, worth noting that using const useState without any initialization works fine, but I would like to take advantage of TypeScript to force type checking on init, especially if it depends on some props.', rating: '4.5'},
  {id:18, shopName: 'The Full Name Of The Shop', description: 'The Full Description. But Im sure there is a better way. Also, setUser should be initialized as a function that takes a IUser as input, and returns nothing. Also, worth noting that using const useState without any initialization works fine, but I would like to take advantage of TypeScript to force type checking on init, especially if it depends on some props.', rating: '4.5'},
  {id:19, shopName: 'The Full Name Of The Shop', description: 'The Full Description. But Im sure there is a better way. Also, setUser should be initialized as a function that takes a IUser as input, and returns nothing. Also, worth noting that using const useState without any initialization works fine, but I would like to take advantage of TypeScript to force type checking on init, especially if it depends on some props.', rating: '4.5'},
  {id:20, shopName: 'The Full Name Of The Shop', description: 'The Full Description. But Im sure there is a better way. Also, setUser should be initialized as a function that takes a IUser as input, and returns nothing. Also, worth noting that using const useState without any initialization works fine, but I would like to take advantage of TypeScript to force type checking on init, especially if it depends on some props.', rating: '4.5'},
]

const HomeScreen = ({navigation: { navigate }}) => {

  const showToaster = (message: any) => {ToastAndroid.showWithGravityAndOffset(message, ToastAndroid.LONG, ToastAndroid.CENTER,25,50,);}
  const [shops, setShops] = useState<any>([]);
	const [totalShops, setTotalShops] = useState(0);
  const [page, setPage] = useState(1);
	const [caughtAll, setCaughtAll] = useState(false);
	const [pendingCall, setPendingCall] = useState(false);
  const [isRefereshing, setIsRefereshing] = useState(false)

  const getShops = async (pageNum) => {
    setPendingCall(true);
    await getNearByShopsAPI(pageNum).then(res=>{
      if(res.data.status === "success"){
        if(res.data.page===1){
          setShops(res.data.nearby_shops);
        }else{
          setShops(prevShops=>[...prevShops, ...res.data.nearby_shops]);
        }
        setCaughtAll(res.data.caughtAll);
        setTotalShops(res.data.nearby_shops_count)
        setPage(res.data.page);
      }else showToaster(res.data.message);
    }).catch(err=>showToaster(err.message));
    setPendingCall(false);
    setIsRefereshing(false);
  }

  const resetParamOnReferesh = () => {
    setIsRefereshing(true); 
    getShops(1);
  }

  useEffect(()=>{
    getShops(page);
  },[]);

  const onCardClick = (id) => {
    navigate('ShopDetails', {'shopId': id});
  }

  return (
    <FlatList
      data={shops}
      renderItem={({item}:any)=><ShopCard key={item.id} shop={item} onPress={onCardClick} />}
      keyExtractor={item => item.id}
      ListEmptyComponent={()=><Text style={styles.noResult}>{caughtAll ? "No Results Found" : ""}</Text>}
      initialNumToRender={10}
      onEndReachedThreshold={1}
      onEndReached={(info) => {
        if(!caughtAll && !pendingCall){
          getShops(page+1);
        }
      }}
      ListFooterComponent={()=><Text style={styles.noResult}>{!caughtAll ? "loading..." : ""}</Text>}
      refreshing={isRefereshing}
      onRefresh={resetParamOnReferesh}
    />
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  noResult: {
    width: '100%',
    textAlign: 'center',
    marginVertical: 10,
    color: 'black'
  }
})