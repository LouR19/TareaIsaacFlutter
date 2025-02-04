import 'dart:math';

void main(List<String> arguments) async{
/*   print('Hello world: ${salud_tarea.calculate()}!'); */
print('🔬Bienvenido a DatoSalud🩸...');
await carga_seg();
print('Proceso completado...✅');
  print('----------------🔬DatoSalud🩸----------------');
  final v = valores();

  final sVital = v.listen((valor) {
    print('Valor: $valor');
    metricas_salud(valor).then((result) {
      print('Resultado metrico: $result');
    });
  });
  await carga_seg();
  print('Hasta luego estrellita...⭐');
  sVital.cancel();
}
Future<void> carga_seg() async{
  Random random = Random();
  int s = random.nextInt(8) + 1;
  print('Procesando datos del Paciente... Esperando $s segundos...🔁');
  await Future.delayed(Duration(seconds: s));

}
String signoVital_Random(){
  List<String> signos_vitales = ['Ritmo Cardiaco','Presion Arterial','Saturacion de Oxigeno en la Sangre'];
  Random random = Random();
  return signos_vitales[random.nextInt(signos_vitales.length)];
}


Map<String, dynamic> valores_Random(){
  Random random = Random();
  return{
    'Valor' : random.nextInt(200)
  };
}
Stream<Map<String, dynamic>> valores() async* {
  await Future.delayed(Duration(seconds: 2)); 
  yield {
    'signo_vital': signoVital_Random(),
    'valor': valores_Random()['Valor'],
  };
}
Future<String> metricas_salud(Map<String, dynamic> dato) async {

  final signoVital = dato['signo_vital'];
  final valor = dato['valor'];

  switch (signoVital) {
    case 'Ritmo Cardiaco':
      if (valor < 60) {
        return 'Ritmo cardíaco bajo🟠 ($valor bpm).';
      } else if (valor > 100) {
        return 'Ritmo cardíaco alto🔴 ($valor bpm).';
      } else {
        return 'Ritmo cardíaco normal🟢 ($valor bpm).';
}
    case 'Presion Arterial':
      if (valor < 90) {
        return 'Presión arterial baja🟠 ($valor mmHg).';
      } else if (valor > 140) {
        return 'Presión arterial alta🔴 ($valor mmHg).';
      } else {
        return 'Presión arterial normal🟢 ($valor mmHg).';
      }
    case 'Saturacion de Oxigeno en la Sangre':
      if (valor < 90) {
        return 'Saturación de oxígeno baja🟠 ($valor%).';
      } else {
        return 'Saturación de oxígeno normal🟢 ($valor%).';
      }
    default:
      return 'Signo vital desconocido. Muerte 💀';
  }
}