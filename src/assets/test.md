# Agilidad (Agility)

Capacidad de obtener y utilizar recursos de TI rápidamente, sin tener que adquirir y preparar físicamente la infraestructura.

### ¿por qué es importante?
básicamente porque si necesitamos crear una infraestructura para desplegar alguna app o montar una base de datos, con un servicio de Cloud Computing podemos hacerlo en minutos, mientras que sino lo tuviéramos tendríamos que comprar hardware, instalar todo lo necesario y darle mantenimiento

### ¿Como se ve esto?

Con aws puedo solicitar mas recursos mediante la consola. **CLI, API, Terraform, CloudFormation etc** 

conceptualmente seria:

- necesito mas capacidad
- solicito recursos en AWS
- recurso disponible

**Ejemplo**
Crear una instancia EC2 en minutos en lugar de comprar, recibir, instalar y configurar un servidor físico.


# #Elasticidad (Elasticity)

La elasticidad es la capacidad de aumentar o disminuir los recursos de TI según la demanda. Imagina que tenemos una app en nest y una instancia de **EC2** es suficiente,

        Usuarios
           ↓
      ┌─────────┐
      │  EC2    │
      └─────────┘

pero llega *Black Friday* y la demanda de usuarios crece, entonces nuestra app se puede **CAER**  

             MUCHOS USUARIOS
                    ↓
        ┌─────────────────────┐
        │        EC2           │
        └─────────────────────┘
                    ↓
                 💥💥💥
              Sobrecargado

con elasticidad podemos aumentar los recursos

             MUCHOS USUARIOS
                    ↓
       ┌──────┬──────┬──────┐
       │ EC2  │ EC2  │ EC2  │
       └──────┴──────┴──────┘

y si la demanda de usuarios vuelve a bajar entonces se disminuyen las instancias de **EC2** 

### ¿Por qué esto es tan bueno?

Porque en infraestructura tradicional podrías tener que comprar servidores suficientes para soportar tu pico máximo de tráfico.

+ la demanda normal puede ser de un *20%*
+ la demanda promedio de un *30%*
+ y en black friday podria ser del *90%*

Durante la mayor parte del año tienes **hardware** que **pagaste pero no estás utilizando completamente.**


# #Ahorro_de_Costos (Cost savings)

Cloud puede reducir los costos de infraestructura porque no necesitas comprar y mantener físicamente todos los recursos que utilizas.

Pensemos en una empresa que quiere montar toda la infraestructura en sus instalaciones, tiene que pagar por:

- Servidor físico
- Electricidad
- Refrigeración
- Espacio físico
- Mantenimiento
- Personal de infraestructura

En aws podemos consumir recursos según las necesidades

Necesito recursos
       ↓
    AWS
       ↓
Utilizo recursos
       ↓
Pago por lo utilizado*

**Esto puede convertir un gasto grande inicial en un modelo mucho más flexible.**

### EJEMPLO

Supongamos que necesitas un servidor para una prueba. En on-premises debes:

- comprar servidor → instalarlo → configuración → utilizarlo

Y después de terminar la prueba, **el servidor sigue siendo tuyo** y sigue ocupando espacio.

mientras que en CLOUD puedes hacer lo siguiente:

* Crear recurso → hacer la prueba → eliminar recurso.

**CONCLUSIÓN:** Cloud puede reducir los costos de infraestructura al evitar grandes inversiones iniciales en hardware y permitir utilizar recursos según las necesidades.


# #Alcance_global (Global reach)

Una de las grandes ventajas de cloud es que puedes **desplegar tus aplicaciones y servicios en diferentes partes del mundo** sin tener que construir físicamente centros de datos en cada lugar.

por ejemplo, imaginemos que tenemos una API desplegada asi:

              AWS
               │
       ┌───────┼────────┐
       ↓       ↓        ↓
     USA    Europa    Asia
      │        │        │
     EC2      EC2      EC2

Tu empresa podría tener usuarios en Colombia, Estados Unidos y Europa, y utilizar infraestructura de AWS ubicada en diferentes regiones para acercar los servicios a esos usuarios.

### ¿Qué problema resuelve esto?

Supongamos que tienes **todos tus servidores en Estados Unidos**:

Usuario Colombia ───────┐
Usuario México ─────────┼──→ 🇺🇸 AWS
Usuario España ─────────┤
Usuario Japón ─────────┘

Todos tiene que comunicarse con los servidroes que estan en EEUU lo cual puede ocasionar latencia si los usuarios estan en zonas muy alejadas, entonces podemos hacer lo siguiente:

                 AWS
                  │
       ┌──────────┼──────────┐
       ↓          ↓          ↓
   🇺🇸 USA     🇪🇺 Europa   🌏 Asia
       ↑          ↑          ↑
    usuarios   usuarios   usuarios

Esto puede ayudar a reducir la latencia y facilitar que tu aplicación esté disponible para usuarios de distintas partes del mundo.

**CONCLUSIÓN :** La infraestructura global de AWS permite desplegar recursos en diferentes ubicaciones geográficas para acercar las aplicaciones a los usuarios y facilitar su operación a escala mundial.

Cloud permite que una empresa tenga presencia tecnológica global sin tener que construir físicamente su propia infraestructura en cada país.



# #Alta_disponibilidad (high availability)

Diseñar los sistemas para que permanezcan disponibles incluso cuando ocurran fallos.

Y aqui hay algo importante, *alta disponibilidad* no significa que nunca haya **fallos** 

Significa que **si algo falla, el sistema puede seguir funcionando o recuperarse rápidamente**.

pensemos que tenemos solo una instancia de EC2 para nuestros usuarios, si esta se cae entonces nuestros usuarios no podrían acceder a la APP. Ahora imaginemos que tenemos VARIAS instancias, si una falla las otras pueden continuar atendiendo, el servidor que esta caído no recibe las peticiones porque AWS no lo llama sino que redirecciona kas peticiones a los servidores que estén disponibles

### ¿Y AWS cómo ayuda con esto?

AWS tiene infraestructura distribuida en diferentes ubicaciones y proporciona servicios que permiten construir sistemas redundantes.

Por ejemplo, más adelante vas a aprender sobre:

- **Availability Zones**
- **Load Balancers**
- **Auto Scaling**
- **Amazon RDS Multi-AZ**

pero ojo que hay dos conceptos diferentes

1. **Redundacia:** Tengo varias instancias para que si una falla, las demás puedan continuar.
2. **Auto Scaling / recuperación automática:** Si una instancia falla, AWS puede crear/reemplazar recursos automáticamente para mantener la capacidad deseada.

                    Usuarios
                       │
                       ▼
                Load Balancer
                       │
             ┌─────────┼─────────┐
             ▼         ▼         ▼
           EC2 #1    EC2 #2    EC2 #3
             💥        ✅        ✅
                       ↑
                 siguen funcionando
                       
              Auto Scaling
                    ↓
              crea/reemplaza
                 EC2 #4


**CONCLUSIÓN:** Capacidad de un sistema para permanecer disponible ante fallos mediante redundancia, distribución y mecanismos de recuperación.