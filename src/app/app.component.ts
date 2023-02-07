import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'todolist';
  dataStorage = localStorage.getItem('arrdata');
  dttodolist: any[] = JSON.parse(this.dataStorage!);
  dttodoSuccess = localStorage.getItem('arrdata_success');
  todoSuccess: any[] = JSON.parse(this.dttodoSuccess!);
  divcard1: boolean = true;
  divcard2: boolean = false;

  constructor(){
     //ถ้าค่าใน dataStorage == null ให้ setItem เป็น [] (ยังเป็น string อยู่)
     if(this.dataStorage && this.dttodoSuccess === null){
      localStorage.setItem('arrdata','[]')
      localStorage.setItem('arrdata_success','[]')
    }
  }

  ngOnInit(): void {
      console.log(this.dataStorage)
      console.log(this.dttodoSuccess)
    // localStorage.clear()
  }
  
  insertnewdata(newdata: string) {
    
    if (newdata.length === 0) {
      alert("please type something.. ");
    }
    else {

      //ประกาศตัวแปร arraydata ให้มีค่าเป็น [] (ยังเป็น string อยู่)
      const arraydata = this.dataStorage

      //แปลง string เป็น array แล้ว push data ใส่ array
      const convertarr = JSON.parse(arraydata!)
      convertarr.push(newdata)


      //แปลง array to string แล้ว push to localstorage
      const finalData = JSON.stringify(convertarr)
      localStorage.setItem('arrdata', finalData)


      setTimeout(() => {
        window.location.reload();
      }, 100);
    }
  }

  checkData(data: number) {
    setTimeout(() => {}, 10000);
    this.moveData(data);
  }

  moveData(data: number) {
    console.log(typeof this.dttodolist[data])
    this.insertDataSuccess(this.dttodolist[data])
    this.dttodolist.splice(data, 1)
    const deleteData = JSON.stringify(this.dttodolist)
    localStorage.setItem('arrdata', deleteData)
  }

  insertDataSuccess(datasuccess: string) {
    if (datasuccess.length === 0) {
      console.log("data null");
    }
    else {

      //ประกาศตัวแปร arraydata ให้มีค่าเป็น [] (ยังเป็น string อยู่)
      const arraydatasucess = localStorage.getItem('arrdata_success')

      //แปลง string เป็น array แล้ว push data ใส่ array
      const convertarrsuccess = JSON.parse(arraydatasucess!)
      console.log("convertarrsuccess", convertarrsuccess)

      convertarrsuccess.push(datasuccess)
      console.log("convertarrsuccess", convertarrsuccess)


      // แปลง array to string แล้ว push to localstorage
      const finalDatasucess = JSON.stringify(convertarrsuccess)
      localStorage.setItem('arrdata_success', finalDatasucess)

      setTimeout(() => {
        window.location.reload();
      }, 100);

    }

  }

  updateData(dataUpdate: string, dataindex: number) {
    console.log(typeof this.dttodolist[dataindex], dataUpdate)
    this.dttodolist.splice(dataindex, 1, dataUpdate)
    const updateData = JSON.stringify(this.dttodolist)
    localStorage.setItem('arrdata', updateData)

  }

  deleteDataFromTodoList(data: number) {
    let msg = " delete " + this.dttodolist.splice(data, 1) + "  ??";
    if (confirm(msg) == true) {
      this.dttodolist.splice(data, 1)
      const deleteDatalist = JSON.stringify(this.dttodolist)
      localStorage.setItem('arrdata', deleteDatalist)
    }
    else {
      setTimeout(() => {
        window.location.reload();
      }, 50);
    }
  }

  deleteDataFromSuccessList(dataSuccess: number) {
    this.todoSuccess.splice(dataSuccess, 1)
    const deleteDataSuccess = JSON.stringify(this.todoSuccess)
    localStorage.setItem('arrdata_success', deleteDataSuccess)
  }

  editData() {
    this.divcard1 = false;  
    this.divcard2 = true;  

  }

  closeEditData(dataUpdate: string, index: number) {
    this.updateData(dataUpdate, index)
    this.divcard1 = true;
    this.divcard2 = false;

  }

  closeinputEditData() {
    this.divcard1 = true;
    this.divcard2 = false;
  }

}
