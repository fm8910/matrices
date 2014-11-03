$(document).ready(function() {
var tam;
var eqns=[];
var identidad=[];
var inversa=[];
var pasos="";
var sinsolucion=false;
var cp=1;
 $('.form-control').change(function(){
   tam= + $( ".form-control option:selected" ).text();

   $('#centrar').css("display", "block");
   printCampos();
   $("#a00").focus();
   $('[type=text]').keypress(function(event) {
    if(event.which < 45
    || event.which > 59) {
        event.preventDefault();
        
    } // prevent if not number/dot
  
        
     if(event.which == 45 &&
        $(this).val().indexOf('-') != -1 ) {
       event.preventDefault();
         
    }
    if(event.which == 46
    && $(this).val().indexOf('.') != -1) {
        event.preventDefault();
    } 
});
})
 getValores();
 //solveGaussJordan () ;
function getValores(){
	var todobien=false;
	var salir=false;
	$('#calcular').click(function() {
		salir=false;
		for (var i = 0; i < tam; i++) {
			eqns[i]=[];
			if (salir) {
				break;
			}
			for (var j = 0; j <= tam; j++) {
				ide= "#a"+i +""+j;
				if ($(ide).val().length!=0) {
					valor= + $(ide).val();
					if (valor!=NaN) {
				eqns[i][j]= valor;
				todobien=true;
			}else{
				alert("Ingrese un numero Valido");
				$(ide).focus();
				salir=true;	
				todobien=false;
				break;	
						
			}
				}else{			
					alert("Ingrese un numero");
					$(ide).focus();
					salir=true;
					todobien=false;
					break;
					
				}
			
			}
		}
		if (todobien) {
			midentidad();
			solveGaussJordan();
		}
		
	});
	$("#limpiar").click(function() {
		for (var i = 0; i < tam; i++) {
			for (var j = 0; j <= tam; j++) {
				ide= "#a"+i +""+j;
				$(ide).val("");
							
			}
		}
		$("#a00").focus();
		$("#res").html("");
	});
}
function solveGaussJordan() {
	gjNsize = eqns.length ;
		
	for (var iii = 0; iii <=(gjNsize-1); iii++){
		mayor(iii);
		hayceros(iii);
		normaLize (identidad[iii],eqns[iii],iii ) ;
		for (var jjj = iii; jjj <=(gjNsize-2); jjj++) {
			
			subScaled (identidad[iii],identidad[(jjj+1)],eqns[iii],eqns[(jjj+1)],iii)
		}
	} ;
 	normaLize (identidad[(gjNsize-1)], eqns [(gjNsize-1)],(gjNsize-1) ) ;
 	arrinversa();
 	jorDanify () ;
 	imprimir();
 	finversa();
 	//printInversa();
 	printIdentidad();
 	printPasos();
 	
 } 
 function arrinversa(){
 	for (var i = 0; i < tam; i++) {
 		inversa[i]=[];
 		for (var j=0; j< tam;j++){
 			inversa[i][j]= eqns[i][j];
 		}
 	}
 }
 function midentidad(){
 	for (var i = 0; i < tam; i++) {
 		identidad[i]=[];
 		for (var j=0; j< tam;j++){
 			if (i==j){
 				identidad[i][j]=1;
 			}else{
 				identidad[i][j]=0;
 			}
 		}
 	}
 }
 function finversa(){
 	stam= inversa.length;
 	for (var i3 = (stam-1); i3 >=1; i3--){
 		for (var i4 = i3; i4 >0 ; i4--){
 			ceroArriba (identidad[i3],identidad[(i4-1)],inversa[i3],inversa[(i4-1)],i3);
 		}
 	}
 }

 function normaLize (inv,bb,cc) {
 	var c=0 //default
 	xx = bb[cc] ;
 	if (xx!=0) {
 		
 		for (var ii = 0; ii <= gjNsize; ii++)
 	{ 
 		if (ii<gjNsize) {
 			inv[ii]= (inv[ii]/xx);
 		} 		
 		bb[ii] = (bb[ii]/xx) ;
 	} 
 	pasos += "<p><strong>Paso "+ (cp) + ":</strong> Dividimos Fila"+ (cc+1) +" entre "+ (xx) +"<br> </p>";
 		actualfx(eqns);
 	}
 	cp=cp+1;
 	
 } 
  function subScaled (inv,ina,aa,bb,cc) {
 	xx = bb[cc] ;
 	for (var ii = cc; ii <=gjNsize; ii++)
 	{ 
 		bb[ii] -= aa[ii] *xx ;
 	}
 	for (var i = 0; i < gjNsize; i++) {
 		ina[i] -= inv[i]*xx;
 	}		
 		
 	pasos += "<p><strong>Paso "+ (cp) + ":</strong> Restamos Fila"+ (cc+1) +" menos Fila"+ (xx) +"<br> </p>";
 	actualfx(eqns);
 	cp=cp+1;
 	
 	
}
  function ceroArriba (inv,ina,aa,bb,cc) {
 	xx = bb[cc] ;
 	for (var ii = inv.length-1 ; ii >=0; ii--)
 	{ 
 		
 		ina[ii] -= inv[ii]*xx;
 		bb[ii] -= aa[ii] *xx ;
 	}
 	pasos += "<p><strong>Paso "+ (cp) + ":</strong> Restamos Fila"+ (cc+1) +" menos Fila"+ (xx) +"<br> </p>";
 	actualfx(inversa);
 	cp=cp+1;
}

function jorDanify() {
 	for (var i3 = (gjNsize-1); i3 >=1; i3--){
 		zz = eqns[i3][gjNsize] ;
 		for (var i4 = (i3-1); i4 >=0 ; i4--){
 			eqns[i4][gjNsize] -= eqns [i4][i3]*zz
 			eqns[i4][i3] = 0 ; 

 		} 
 				
	} 

} 
 function hayceros(cc){
 var diagonal=false; //diagonal tiene cero?
 var cambiar=false; //si encontramos valor distinto de cero
 	for( var i=cc; i<gjNsize;i++){
 		if (eqns[i][cc]==0) {
 			if (i==cc) {
 				diagonal=true; //la diagonal tiene cero
 				fc=i; //fila cero
 				fcero= eqns[fc];
 				finversa= identidad[fc];
 			}
 			
 		} else { if (i==cc){ break;}}
 		if(diagonal && eqns[i][cc]!=0){
 			fn=i;
 			cambiar=true; //si encontramos un valor que no sea cero  cambiamos las filas
 			break;
 		}
 	}
 	if (diagonal && cambiar) {
 		identidad[fc]=identidad[fn];
 		eqns[fc]=eqns[fn];
 		eqns[fn]=fcero;
 		identidad[fn]=finversa;
 		pasos += "<p><strong>Paso "+ (cp) + ":</strong> Intercambiamos Fila"+ (fila+1) +" con Fila"+ (cd+1) +"<br> </p>";
 		actualfx(eqns);
 		cp=cp+1;
 	}else {
 		
 	}
 	
 	 
 }
 function mayor(cd){
 	var tem=0;
 	var fila=0;
 	var cam=false;

 for (var i = cd; i < gjNsize; i++) {
 		if (i==cd) {
 			tem= Math.abs(eqns[i][cd]);
 		}
 		if (tem< Math.abs(eqns[i][cd])) { 
 			tem= Math.abs(eqns[i][cd]);
 			fila=i;
 			m= eqns[i];
 			minv= identidad[i];
 			cam=true;
 		}
 		
 }
 if (cam) {
  eqns[fila]= eqns[cd];
 eqns[cd]=m;
 identidad[fila]= identidad[cd];
 identidad[cd]=minv;
pasos += "<p><strong>Paso "+ (cp) + ":</strong> Intercambiamos Fila"+ (fila+1) +" con Fila"+ (cd+1) +"<br> </p>";
actualfx(eqns);
cp=cp+1;
}
 }

function imprimir(){
$('#res').html( function(){
		var res = "<ul>";
        for (var i = 0; i < gjNsize; i++) {
		  res += "<li> <strong>X"+ (i+1) +"</strong>= "+ Math.round(eqns[i][gjNsize]) + "</li>"
	    }
res+="</ul>";
return res;
});
}
function actualfx(arr){
	pasos += "<table cellpadding='1' cellspacing='0'>";
	pasos +="<tbody><tr><td class='tl'>&nbsp;</td><td></td><td class='tr'>&nbsp;</td></tr>"
	pasos +="<tr><td class='lb'>&nbsp;</td><td ><table><tbody>";
			for (var i = 0; i < gjNsize; i++) {
        	pasos += "<tr>";
        	for (var j = 0; j < gjNsize; j++) {
        		pasos += "<td class='matel'>"+ Math.round(arr[i][j] * 100) / 100 + "</td>"

        	}
        	
        	pasos+="</tr>";
		  
	    }
	    
pasos+="</tbody></table></td>";
pasos+="<td class='rb'>&nbsp;</td></tr>";
pasos+="<tr><td class='bl'>&nbsp;</td><td></td><td class='br'>&nbsp;</td></tr>";
pasos +="</tbody></table>";
}
function printInversa(){
	$('#pasos').html( function(){
		var es = "<p>";
        for (var i = 0; i < gjNsize; i++) {
        	es += "[";
        	for (var j = 0; j < gjNsize; j++) {
        		es += " "+ Math.round(eqns[i][j]*100) /100 + " "

        	}
        	
        	es+="], <br>";
		  
	    }
es+="</p>";
return es;
});
}
function printPasos(){
	$('#pasos').html(pasos);

}
function printIdentidad(){
	$('#iden').html( function(){
		var es = "<table><tbody>";
        for (var i = 0; i < gjNsize; i++) {
        	es += "<tr>";
        	for (var j = 0; j < gjNsize; j++) {
        		es += "<td class='matel'>"+ Math.round(identidad[i][j] * 100) / 100 + "</td>"

        	}
        	
        	es+="</tr>";
		  
	    }	    
es+="</tbody></table>";
return es;
});
}
function printCampos(){
	$('#agregar').html( function (){
		var res= "";
		for (var i = 0; i < tam; i++) {
			for (var j = 0; j < tam; j++) {
				res += "<input  id='a"+ i + ''+ j +"' size='5' maxlength='5' class='mform' type='number'>&nbsp;";
			}
			res += "<br>";			
		}
		
		return res;
	});
$('#val').html( function (){
		var res= "";
		for (var i = 0; i < tam; i++) {
			res += "<input  id='a"+ i + ''+ tam +"' size='5' maxlength='5' class='mform' type='number'>&nbsp;";
			res += "<br>";			
		}
		
		return res;
	});

}
});
