import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { GenericService } from 'src/app/share/generic.service';
import Chart from 'chart.js/auto';
import { AuthenticationService } from 'src/app/share/authentication.service';

@Component({
  selector: 'app-reporte-grafico',
  templateUrl: './reporte-grafico.component.html',
  styleUrls: ['./reporte-grafico.component.css']
})
export class ReporteGraficoComponent implements AfterViewInit{
  isVend:Boolean = false
  isAdmin:Boolean = false
  currentUser:any
  //Canvas para el grafico
  canvas: any;
  canvas2: any;
  canvas3: any;
  canvas4: any;
  canvas5: any;
  //Contexto del Canvas
  ctx: any;
  ctx2: any;
  ctx3:any
  ctx4:any
  ctx5:any
  //Elemento html del Canvas
  @ViewChild('graficoCanvas') graficoCanvas!: { nativeElement: any };
  @ViewChild('graficoCanvas2') graficoCanvas2!: { nativeElement: any };
  @ViewChild('graficoCanvas3') graficoCanvas3!: { nativeElement: any };
  @ViewChild('graficoCanvas4') graficoCanvas4!: { nativeElement: any };
  @ViewChild('graficoCanvas5') graficoCanvas5!: { nativeElement: any };
  //Establecer gráfico
  grafico: any;
  grafico2:any
  grafico3:any
  grafico4:any
  grafico5:any
  //Datos para mostrar en el gráfico
  datos: any;
  datos2: any;
  datos3: any;
  datos4: any;
  datos5: any;
  //Lista de meses para filtrar el gráfico
  mesList:any;
  //Mes actual
  filtro1 = new Date().getMonth();
  destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(
    private gService: GenericService,
    private authService: AuthenticationService
  ) {
    this.listaMeses();
  }
  listaMeses(){
    this.mesList = [
      { Value: 1, Text: 'Enero' },
      { Value: 2, Text: 'Febrero' },
      { Value: 3, Text: 'Marzo' },
      { Value: 4, Text: 'Abril' },
      { Value: 5, Text: 'Mayo' },
      { Value: 6, Text: 'Junio' },
      { Value: 7, Text: 'Julio' },
      { Value: 8, Text: 'Agosto' },
      { Value: 9, Text: 'Septiembre' },
      { Value: 10, Text: 'Octubre' },
      { Value: 11, Text: 'Noviembre' },
      { Value: 12, Text: 'Diciembre' }
  ]
  }
  ngAfterViewInit(): void {
    this.authService.currentUser.subscribe((x)=>(this.currentUser=x));
    if (this.currentUser.user.rol == "ADMINISTRADOR") {
      this.isVend = false
      this.isAdmin = true      
    } else {
      this.isVend = true
      this.isAdmin = false
    }
    this.inicioTopMes(this.filtro1);
    this.inicioTopVendedores();
    this.inicioTopPeores()
    this.inicioMasVendidos()
    this.inicioMejorCliente()
  }

  inicioTopMes(newValue:any){
   this.filtro1 = newValue;
   if (this.filtro1) {
    this.gService.get('pedido/ropaProducto',this.filtro1).pipe(takeUntil(this.destroy$)).subscribe((data:any)=>{
      this.datos = data
      console.log(this.datos)
      this.graficoBrowser()
    })
   }
  }

  inicioTopVendedores(){
    this.gService.list('pedido/topvendedores').pipe(takeUntil(this.destroy$)).subscribe((data:any)=>{
      this.datos2 = data
      console.log(this.datos2)
      this.graficoBrowser2()
    })
  }

  inicioTopPeores(){
    this.gService.list('pedido/topPeores').pipe(takeUntil(this.destroy$)).subscribe((data:any)=>{
      this.datos3 = data
      this.graficoBrowser3()
    })
  }

  inicioMasVendidos(){
    this.gService.get('pedido/masVendida',this.currentUser.user.id).pipe(takeUntil(this.destroy$)).subscribe((data:any)=>{
      this.datos4 = data
      this.graficoBrowser4()
    })
  }

  inicioMejorCliente(){
    this.gService.get('pedido/mejorCliente',this.currentUser.user.id).pipe(takeUntil(this.destroy$)).subscribe((data:any)=>{
      console.log(data)
      this.datos5 = data
      this.graficoBrowser5()
    })
  }
  //Configurar y crear gráfico
  graficoBrowser(): void {
   this.canvas=this.graficoCanvas.nativeElement;
   this.ctx = this.canvas.getContext('2d');
   //Si existe destruir el Canvas para mostrar el grafico
   if(this.grafico){
    this.grafico.destroy();
   }
   this.grafico= new Chart(this.ctx,{
    type:'pie',
    data:{
      
      //Etiquetas debe ser un array
      labels: this.datos.map(x => x.ropa+"\t"+x.marca),
      datasets:[
        {
          backgroundColor: [
            'rgba(255, 99, 132)',
            'rgba(255, 159, 64)',
            'rgba(255, 205, 86)',
            'rgba(75, 192, 192)',
            'rgba(54, 162, 235)',
            'rgba(153, 102, 255)',
            'rgba(201, 203, 207)'
        ],
        //Datos del grafico, debe ser un array
        data: this.datos.map(x => x.suma)
        },
      ]
    },
        options:{
          responsive:false,
          maintainAspectRatio: false,
        },
      
   });
  }

  graficoBrowser2(): void {
    this.canvas2=this.graficoCanvas2.nativeElement;
    this.ctx2 = this.canvas2.getContext('2d');
    //Si existe destruir el Canvas para mostrar el grafico
    if(this.grafico2){
     this.grafico2.destroy();
    }
    this.grafico2 = new Chart(this.ctx2,{
     type:'pie',
     data:{
       
       //Etiquetas debe ser un array
       labels: this.datos2.map(x => x.usuario),
       datasets:[
         {
           backgroundColor: [
             'rgba(255, 99, 132)',
             'rgba(255, 159, 64)',
             'rgba(255, 205, 86)',
             'rgba(75, 192, 192)',
             'rgba(54, 162, 235)',
             'rgba(153, 102, 255)',
             'rgba(201, 203, 207)'
         ],
         //Datos del grafico, debe ser un array
         data: this.datos2.map(x => x.nota)
         },
       ]
     },
         options:{
           responsive:false,
           maintainAspectRatio: false,
         },
       
    });
   }

   graficoBrowser3(): void {
    this.canvas3=this.graficoCanvas3.nativeElement;
    this.ctx3 = this.canvas3.getContext('2d');
    //Si existe destruir el Canvas para mostrar el grafico
    if(this.grafico3){
     this.grafico3.destroy();
    }
    this.grafico3 = new Chart(this.ctx3,{
     type:'pie',
     data:{
       
       //Etiquetas debe ser un array
       labels: this.datos3.map(x => x.usuario),
       datasets:[
         {
           backgroundColor: [
             'rgba(255, 99, 132)',
             'rgba(255, 159, 64)',
             'rgba(255, 205, 86)',
             'rgba(75, 192, 192)',
             'rgba(54, 162, 235)',
             'rgba(153, 102, 255)',
             'rgba(201, 203, 207)'
         ],
         //Datos del grafico, debe ser un array
         data: this.datos3.map(x => x.nota)
         },
       ]
     },
         options:{
           responsive:false,
           maintainAspectRatio: false,
         },
       
    });
   }

   graficoBrowser4(): void {
    this.canvas4=this.graficoCanvas4.nativeElement;
    this.ctx4 = this.canvas4.getContext('2d');
    //Si existe destruir el Canvas para mostrar el grafico
    if(this.grafico4){
     this.grafico4.destroy();
    }
    this.grafico4 = new Chart(this.ctx4,{
     type:'pie',
     data:{
       
       //Etiquetas debe ser un array
       labels: this.datos4.map(x => x.ropa+"\t"+x.marca),
       datasets:[
         {
           backgroundColor: [
             'rgba(255, 99, 132)',
             'rgba(255, 159, 64)',
             'rgba(255, 205, 86)',
             'rgba(75, 192, 192)',
             'rgba(54, 162, 235)',
             'rgba(153, 102, 255)',
             'rgba(201, 203, 207)'
         ],
         //Datos del grafico, debe ser un array
         data: this.datos4.map(x => x.suma)
         },
       ]
     },
         options:{
           responsive:false,
           maintainAspectRatio: false,
         },
       
    });
   }

   graficoBrowser5(): void {
    this.canvas5=this.graficoCanvas5.nativeElement;
    this.ctx5 = this.canvas5.getContext('2d');
    //Si existe destruir el Canvas para mostrar el grafico
    if(this.grafico5){
     this.grafico5.destroy();
    }
    this.grafico5 = new Chart(this.ctx5,{
     type:'pie',
     data:{
       
       //Etiquetas debe ser un array
       labels: this.datos5.map(x => x.usuario),
       datasets:[
         {
           backgroundColor: [
             'rgba(255, 99, 132)',
             'rgba(255, 159, 64)',
             'rgba(255, 205, 86)',
             'rgba(75, 192, 192)',
             'rgba(54, 162, 235)',
             'rgba(153, 102, 255)',
             'rgba(201, 203, 207)'
         ],
         //Datos del grafico, debe ser un array
         data: this.datos5.map(x => x.suma)
         },
       ]
     },
         options:{
           responsive:false,
           maintainAspectRatio: false,
         },
       
    });
   }

  ngOnDestroy() {
    this.destroy$.next(true);
    // Desinscribirse
    this.destroy$.unsubscribe();
  }
}
