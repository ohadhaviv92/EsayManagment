const URL = "http://ruppinmobile.tempdomain.co.il/site04/WebService.asmx"; // http://ruppinmobile.tempdomain.co.il/site04/api/service   http://ruppinmobile.tempdomain.co.il/site04/WebService.asmx
export default class SQL {
  static Login(UserName, Pass) {
    console.log(UserName , Pass);
    
    return new Promise(async (resolve, reject) => {
      try {
        const res = await fetch(`${URL}/Login`, {
          body: JSON.stringify({
            UserName,
            Pass
          }),
          headers: {
            "content-type": "application/json"
          },
          method: "POST"
        });
        console.log(`${URL}/Login`,res);
        
        const data = await res.json();
<<<<<<< HEAD
      
=======

>>>>>>> c0f52d2a825342b5e0286c03c8f4be87af517278
        if (data.d === null) reject("invalid email or password");

        resolve(data.d);
      } catch (error) {
        reject(error);
      }
    });
  }

  static Register(UserName, Pass, FirstName, LastName, Email, Tel) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await fetch(`${URL}/Register`, {
          body: JSON.stringify({
            UserName,
            Pass,
            FirstName,
            LastName,
            Email,
            Tel
          }),
          headers: {
            "content-type": "application/json"
          },
          method: "POST"
        });

        const data = await res.json();
        console.log(data);
        
        if (data.d.Error !== undefined) {
          // if a JSON was not returned from SQL, its a custom error message
          reject(data.d.Error);
        }
        resolve(data.d);
      } catch (error) {
        reject(error);
      }
    });
  }

  static GetKey() {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await fetch(`${URL}/GetKey`,
          {
            headers: {
              "content-type": "application/json"
            },
            method: "POST"
          }
        );


        const data = await res.json();

        if (data.d.length > 0) {
          resolve(data.d);
        }
        reject("No Key was fetched");
      } catch (error) {
        reject(error);
      }
    });
  }

  static async UpdateNotification(Email, Token) {

    try {
      await fetch(`${URL}/Notify`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          Email,
          Token
        }),
      });
    } catch (error) {
      console.log(error);

    }

  }



  static GetJobs() {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await fetch(`${URL}/GetJobsDetails`,
          {
            headers: {
              "content-type": "application/json"
            },
            method: "POST"
          }
        );


        const data = await res.json();

        if (data.d !== null) {
          resolve(data.d);
        }
      } catch (error) {
        reject(error);
      }
    });
  }


  static async GetSentInvites(userId) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await fetch(`${URL}/SentInvites`, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'content-type': 'application/json',
          },
          body: JSON.stringify({ UserId: userId }),
        });

        const data = await res.json();

        if (data.d !== null) {
          resolve(data.d);
        }
        reject("No sent invites");

      } catch (error) {
        console.log(error);

      }
    });

  }



  static async GetRecivedInvites(userId) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await fetch(`${URL}/GetRecivedInvites`, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'content-type': 'application/json',
          },
          body: JSON.stringify({ UserId: userId }),
        });

        const data = await res.json();

        if (data.d !== null) {
          resolve(data.d);
        }
        reject("No recived invites");

      } catch (error) {
        console.log(error);

      }
    });

  }

  static async SendInvite(SiteId, UserType, SenderId, Reciver) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await fetch(`${URL}/SendInvite`, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'content-type': 'application/json',
          },
          body: JSON.stringify({
            SiteId,
            SenderId,
            ReciverName: Reciver,
            UserType,
          }),
        });

        const data = await res.json();

        if (data.d !== null) {
          if (data.d.Error)
            reject(data.d.Error);

          resolve(data.d);
        }
        reject("No recived invites");

      } catch (error) {
        console.log(error);

      }
    });

  }



  static async DeleteInvite(siteId, senderId, reciverId) {
    console.log(siteId, senderId, reciverId);

    return new Promise(async (resolve, reject) => {
      try {
        const res = await fetch(`${URL}/DeleteInvite`, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'content-type': 'application/json',
          },
          body: JSON.stringify({
            SiteId: siteId,
            SenderId: senderId,
            ReciverId: reciverId
          }),
        });

        resolve(true);
      } catch (error) {
        console.log(error);
        reject(error);
      }

    });
  }


  static async RejectInvite(siteId, senderId, reciverId) {

    return new Promise(async (resolve, reject) => {
      try {
        const res = await fetch(`${URL}/RejectInvite`, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'content-type': 'application/json',
          },
          body: JSON.stringify({
            SiteId: siteId,
            SenderId: senderId,
            ReciverId: reciverId
          }),
        });

        resolve(true)
      } catch (error) {
        reject(error);
      }

    });
  }

  static async AddNewSite(userID, siteName, siteAddress, base64) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await fetch(`${URL}/AddNewSite`, {
          body: JSON.stringify({
            UserId: userID,
            SiteName: siteName,
            SiteAddress: siteAddress,
            base64:base64

          }),
          headers: {
            "content-type": "application/json"
          },
          method: "POST"
        });
        
        
        
        const data = await res.json();
        
        
        resolve(data.d);
      } catch (error) {
        
        
        
        
        reject(error);
      }
    });
  }


  static async ConfirmInvite(siteId, senderId, reciverId) {

    return new Promise(async (resolve, reject) => {
      try {
        const res = await fetch(`${URL}/ConfirmInvite`, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'content-type': 'application/json',
          },
          body: JSON.stringify({
            SiteId: siteId,
            SenderId: senderId,
            ReciverId: reciverId
          }),
        });
        const data = await res.json();

        resolve(data.d)
      } catch (error) {
        reject(error);
      }

    });
  }

  static ChangeSiteStatus(siteID, statusID) {

    return new Promise(async (resolve, reject) => {
      try {
        const res = await fetch(`${URL}/ChangeSiteStatus`, {
          body: JSON.stringify({
            SiteId: siteID,
            StatusId: statusID

          }),
          headers: {
            "content-type": "application/json"
          },
          method: "POST"
        });

        const data = await res.json();

        resolve(data.d);
      } catch (error) {
        reject(error);
      }
    });
  }




  static GetRoomsType() {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await fetch(`${URL}/GetRoomsType`,
          {
            headers: {
              "content-type": "application/json"
            },
            method: "POST"
          }
        );


        const data = await res.json();

        if (data.d !== null) {
          resolve(data.d);
        }
      } catch (error) {
        reject(error);
      }
    });
  }


  static async OutFromSite(siteID, userID) {

    return new Promise(async (resolve, reject) => {
      try {
        const res = await fetch(`${URL}/OutFromSite`, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'content-type': 'application/json',
          },
          body: JSON.stringify({
            SiteId: siteID,
            UserId: userID
          }),
        });
        resolve(true);
      } catch (error) {
        console.log(errorr);
        reject(error);
      }

    });

  }
  static async UploadImg(data) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await fetch(`${URL}/UploadImg`, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'content-type': 'application/json',
          },
          body: JSON.stringify({
            base64: data.base64,
          }),
        });
        resolve(true);
      } catch (error) {
        console.log(errorr);
        reject(error);
      }

    });

  }


  static async AddRoom(siteId, roomTypeId, roomName, floorNumber, base64image = "") {

    return new Promise(async (resolve, reject) => {
      try {
        const res = await fetch(`${URL}/AddRoom`, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'content-type': 'application/json',
          },
          body: JSON.stringify({
            SiteId: siteId,
            RoomTypeId: roomTypeId,
            RoomName: roomName,
            FloorNumber: floorNumber,
            base64image:base64image
          }),
        });

        const data = await res.json();
        
        if (data.d === null)
          reject("couldnt add room");
        resolve(data.d)
      } catch (error) {
        reject(error);
      }

    });

  }

  
  static GetFaultTypes() {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await fetch(`${URL}/GetFaultTypes`,
          {
            headers: {
              "content-type": "application/json"
            },
            method: "POST"
          }
        );


        const data = await res.json();

        if (data.d !== null) {
          resolve(data.d);
        }
      } catch (error) {
        reject(error);
      }
    });
  }


  static GetUsersInSite(SiteId) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await fetch(`${URL}/GetAllUserInSite`,
          {
            headers: {
              "content-type": "application/json"
            },
            body: JSON.stringify({
              SiteId
            }),
            method: "POST"
          }
        );


        const data = await res.json();

        if (data.d !== null) {
          resolve(data.d);
        }
      } catch (error) {
        reject(error);
      }
    });
  }



  
  static async AddFault(OwnerID, WorkerID, RoomID, FaultType, Info, base64 = "") {

    return new Promise(async (resolve, reject) => {
      try {
        const res = await fetch(`${URL}/AddFault`, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'content-type': 'application/json',
          },
          body: JSON.stringify({
            OwnerID, 
            WorkerID, 
            RoomID, 
            FaultType, 
            Info,
            base64
          }),
        });

        const data = await res.json();
  
        if (data.d === null)
          reject("couldnt add room");
        resolve(data.d)
      } catch (error) {
        reject(error);
      }

    });

  }

  static async EditUserDetails(UserID, UserName, FirstName, LastName, Email, Tel,Img) {
    
    
    return new Promise(async (resolve, reject) => {
      try {
        const res = await fetch(`${URL}/EditUserDetails`, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'content-type': 'application/json',
          },
          body: JSON.stringify({
            UserID: UserID,
            UserName: UserName,
            FirstName: FirstName,
            LastName: LastName,
            Email:Email,
            Tel:Tel,
            Img:Img
          }),
        });

        const data = await res.json();


        if (data.d.Error !== undefined) {
          // if a JSON was not returned from SQL, its a custom error message
          reject(data.d.Error);
        }
        resolve(data.d);
      } catch (error) {
        reject(error);
      }
    });
  }


  static async ChangeFaultData(FaultId, FaultStatus, FaultInfo) {

      try {
        await fetch(`${URL}/changeFaultStatus`, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'content-type': 'application/json',
          },
          body: JSON.stringify({
            faultID: FaultId,
            status: FaultStatus,
            info: FaultInfo
          }),
        });

      } catch (error) {
        console.log(error);
        return error;
      }


  }



}
