import React, { Component } from 'react'
import { FlatList, View, RefreshControl, StyleSheet, Dimensions,Picker } from 'react-native'
import { connect } from 'react-redux';
import RoomPreview from '../Room/RoomPreview';
import Empty from '../General/Empty';
import { Icon } from 'react-native-elements';
import Modal from '../General/Modal';
import AddRoom from '../Room/AddRoom';
import SQL from '../../Handlers/SQL';
import {SetFaults} from '../../actions/faultAction';
import {SetRooms} from '../../actions/roomAction';


class Site extends Component {
  state = {
    refreshing: false,
    jobId: NaN,
    rooms: this.props.Rooms.filter(room=>room.SiteId == this.props.SiteId),
    modalVisible: false,
    sortFloor:false,
  }

 
  _onRefresh = async() => {
    this.setState({refreshing: true});


    const userDetails = await SQL.Login(this.props.User.UserName, this.props.User.Pass);
  

    let rooms = [];
    let faults = []
    const sitesWithRooms = userDetails.Sites.filter(site=> site.Rooms.length != 0)

    for(let site of sitesWithRooms) {

       const tempRooms = site.Rooms.map(room=>({
        FloorNumber: room.FloorNumber,
        RoomId: room.RoomId,
        RoomName: room.RoomName,
        RoomPicture: room.RoomPicture,
        RoomTypeId: room.RoomTypeId,
        RoomTypeName: room.RoomTypeName,
        SiteId: site.SiteId
      })) 

      
      rooms = rooms.concat(tempRooms)


      const roomsWithFaults = site.Rooms.filter(room => room.Faults.length != 0 )
      for (const room of roomsWithFaults) {
         const tempFaults =  room.Faults.map(fault=>({
          SiteId: site.SiteId,
          RoomId: room.RoomId,
          ...fault
        })) 
       
        
        faults = faults.concat(tempFaults)
        
      
      }
    }

    
    this.props.SetRooms(rooms)
    this.props.SetFaults(faults)
    this.setState({refreshing: false})
  }

  sortFloor = () => { this.setState({ sortFloor: !this.state.sortFloor }) }

  openModal = () => this.setState((pervState) => ({ modalVisible: !pervState.modalVisible }))

  Close = () => { this.setState({ modalVisible: false }) }

  _ListEmptyComponent = () => <Empty />
  _keyExtractor = (room) => room.RoomId.toString();
  _renderItem = (room) => <RoomPreview room={room.item} navigation={this.props.navigation} />
  _ItemSeparatorComponent =() => <View style={{ overflow: 'hidden', paddingVertical: 7, backgroundColor: '#2C3E50'}}><View style={{paddingVertical: 1, backgroundColor: 'white'}}/></View>

  render() {
    const rooms = this.props.Rooms.filter(room=>room.SiteId == this.props.SiteId);
    return (
      <View>

        <View style={{ flexDirection: 'row' }}>

          {this.props.TypeId == 1 ?    
           <Icon
            type="ionicon"
            name="ios-add-circle-outline"
            size={40}
            color="#ECF0F1"
            underlayColor="transparent"
            containerStyle={{flex:1,alignItems: 'flex-start', marginLeft: '1%'}}
            onPress={this.openModal}
          />: null}

          <Icon
          name="filter-list"
          size={40}
          color={ !this.state.sortFloor ? "#3498DB": "#E74C3C"}
          underlayColor="transparent"
          onPress={this.sortFloor}
          containerStyle={{flex:1, alignItems: 'flex-end', marginRight: '1%'}}
        />

        </View>

        <Modal Toggle={this.openModal} visible={this.state.modalVisible}>
          <AddRoom Close={this.Close} />
        </Modal>

        <FlatList
          ListEmptyComponent={this._ListEmptyComponent}
          ListFooterComponent={()=><View style={{padding: '11%'}}></View>}
          ItemSeparatorComponent={this._ItemSeparatorComponent}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh}
            />
          }
          data={this.state.sortFloor ? rooms.sort((a ,b) => a.FloorNumber - b.FloorNumber) : rooms}

          keyExtractor={this._keyExtractor}
          renderItem={this._renderItem}
        />
      </View>
    )
  }
}


const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E74C3C',
    marginTop: height / 2.5,
  },
  text: {
    fontSize: 21,
    color: '#ECF0F1',
  },

})


const mapStateToProps = state => {
  return {
    User: state.user,
    Sites: state.sites,
    Rooms: state.rooms,
    SiteId: state.curSite,
    TypeId: state.curType
  }
}


const mapDispatchToProps = (dispatch) => ({
  SetFaults: (Faults) => dispatch(SetFaults(Faults)),
  SetRooms: (Rooms) => dispatch(SetRooms(Rooms)),

})

export default connect(mapStateToProps,mapDispatchToProps)(Site);