import React, { Component } from 'react'
import { FlatList, View, RefreshControl, StyleSheet, Dimensions } from 'react-native'
import { connect } from 'react-redux';
import FaultPreview from '../Fault/FaultPreview';
import { Icon } from 'react-native-elements';
import Modal from '../General/Modal';
import AddFault from '../Fault/AddFault';
import Empty from '../General/Empty';

import SQL from '../../Handlers/SQL';
import {SetFaults} from '../../actions/faultAction';
import {SetRooms} from '../../actions/roomAction';

class Room extends Component {
  state = {
    refreshing: false,
    modalVisible: false,
    ShowOpen: false
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

  changeStatus = () => {
    this.setState((pervState) => ({ ShowOpen: !pervState.ShowOpen }))
  }

  openModal = () => this.setState((pervState) => ({ modalVisible: !pervState.modalVisible }))
  Close = () => { this.setState({ modalVisible: false }) }


  _ListEmptyComponent = () => <Empty />
  _ItemSeparatorComponent = () => <View style={{ overflow: 'hidden', paddingVertical: 7, backgroundColor: '#2C3E50' }}><View style={{ paddingVertical: 1, backgroundColor: 'white' }} /></View>
  _keyExtractor = (fault) => fault.FaultId.toString();
  _renderItem = (fault) => <FaultPreview fault={fault.item} />
  render() {
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
              onPress={this.openModal}
            /> : null}



              <Icon
          name="filter-list"
          size={40}
          color={ "#3498DB"}
          underlayColor="transparent"
          onPress={this.changeStatus}
          containerStyle={{flex:1, alignItems: 'flex-end', marginRight: '1%'}}
        />
        </View>

        <FlatList
          ListEmptyComponent={this._ListEmptyComponent}
          ItemSeparatorComponent={this._ItemSeparatorComponent}
          ListFooterComponent={() => <View style={{ padding: '11%' }}></View>}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh}
            />
          }
          data={this.props.Faults.filter(fault => fault.SiteId == this.props.SiteId && fault.RoomId == this.props.RoomId)
                .filter(fault => this.state.ShowOpen ?  fault.FaultStatus != 0 : fault.FaultStatus == 0 )}
          keyExtractor={this._keyExtractor}
          renderItem={this._renderItem}
        />


        <Modal Toggle={this.openModal} visible={this.state.modalVisible}>
          <AddFault Close={this.Close} />
        </Modal>

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
  }

})


const mapStateToProps = state => {
  return {
    User: state.user,
    Faults: state.faults,
    SiteId: state.curSite,
    RoomId: state.curRoom,
    TypeId: state.curType
  }
}


const mapDispatchToProps = (dispatch) => ({
  SetFaults: (Faults) => dispatch(SetFaults(Faults)),
  SetRooms: (Rooms) => dispatch(SetRooms(Rooms)),

})

export default connect(mapStateToProps,mapDispatchToProps)(Room);