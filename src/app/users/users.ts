import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ReactiveFormsModule, FormControl, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import { UserService } from '../services/user';
import {LocationService} from '../services/location';
@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './users.html',
  styleUrl: './users.css',
})
export class Users implements OnInit {
  states: any[]=[];
  filteredStates: any[]=[];
  districts: any[]=[];
  stateControl = new FormControl('');
  searchControl=new FormControl('');
  districtControl= new FormControl<any>(null);
  selectedState: any=null;
  selectedDistrict: any=null;
  users: any[] = [];
  searchText='';
  loading = false;
  errorMessage = '';
  currentPage=1;
  itemsPerPage=5;
  phoneControl=new FormControl('',[
    Validators.required,
    Validators.pattern(/^[6-9][0-9]{9}$/)
  ])
showStateDropdown=false;
selectedUserForModal: any=null;
showUserModal=false;
  constructor(
    private userService: UserService,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private locationService: LocationService
  ) {}

  ngOnInit(): void {
    this.loadUsers();
    this.loadStates();
  }

  loadUsers(): void {
    this.loading = true;

    this.userService.getUsers().subscribe({
      next: (data: any[]) => {
        this.users= data.sort((a,b)=>
        a.name.localeCompare(b.name));
        this.loading = false;

        this.cdr.detectChanges();
      },
      error: (err) => {
        console.log(err);

        this.errorMessage = 'Error fetching users';
        this.loading = false;

        this.cdr.detectChanges();
      },
    });
  }
  get filteredUsers(){
    const searchText=this.searchControl.value||'';
    if(!searchText){
      return this.users;
    }   
const search=searchText.toLowerCase();
return this.users.filter(user=>
  user.name.toLowerCase().includes(search)
);
  }
  get paginatedUsers(){
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.filteredUsers.slice(startIndex, endIndex);
  }
  get totalPages(){
    return Math.ceil(this.filteredUsers.length / this.itemsPerPage);
  }
  nextPage(): void{
    if(this.currentPage < this.totalPages){
      this.currentPage++;
    }
  }
  previousPage(): void{
    if(this.currentPage > 1){
      this.currentPage--;
    }
  }
  onSearchChange():void{
    this.currentPage=1;
  }
  logout():void{
    this.router.navigate(['/']);
  }

  loadStates(): void{
    this.locationService.getStates().subscribe({
      next: (response:any)=>{
        this.states=response.data;
        this.cdr.detectChanges();
      },
      error: (err:any)=>{
        console.log('state loading error',err);
      }
    });
  }
  onStateInput(): void{
    const search= this.stateControl.value?.toLowerCase()||'';
    this.showStateDropdown=true;
    console.log('Search:', search);
  console.log('States:', this.states.length);

  this.filteredStates = this.states.filter(state =>
    state.State_Name.toLowerCase().includes(search)
  );
  }
  
  
  loadDistricts(stateLgCode: number): void {
  console.log('Loading district file for LG code:', stateLgCode);

  this.locationService.getDistricts(stateLgCode)
    .subscribe({
      next: (response:any) => {
        console.log('District response:', response);

        this.districts = response.data;

        console.log('Districts:', this.districts);

        this.selectedDistrict = null;
        this.districtControl.setValue(null);
         this.cdr.detectChanges();
      },
      error: (err:any) => {
        console.log('district loading error', err);
      }
    });
}
  selectState(state: any):void{
    this.selectedState=state;
    this.stateControl.setValue(state.State_Name);
    this.filteredStates=[];
    this.showStateDropdown=false;
    this.loadDistricts(state.State_lg_Code);
  }
  onDistrictChange(): void{
    this.selectedDistrict=this.districtControl.value;
    this.cdr.detectChanges();
  }
  getDistrictName(district:any):string{
    return district.District_name||'';
  }
  openUserDetails(user:any):void{
    this.selectedUserForModal=user;
    this.showUserModal=true;
  }
  closeUserModal():void{
    this.selectedUserForModal=null;
    this.showUserModal=false;
  }
}

