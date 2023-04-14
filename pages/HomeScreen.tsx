import { StyleSheet, Text, ToastAndroid, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import ShopCard from '../components/ShopCard'
import { getNearByShopsAPI } from '../actions/apis';

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
      ListEmptyComponent={()=><Text style={styles.noResult}>{caughtAll ? "There is no store in 50 KM raduis." : ""}</Text>}
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