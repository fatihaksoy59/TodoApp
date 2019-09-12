### Proje Hakkında

-Bu proje Huawei için Spring Boot ve ReactJS kullanarak geliştirilmiştir.
-Projeyi çalıştırmak için bazı ayarlamara ihtiyacımız var.

-İlk olarak https://www.mysql.com/downloads/ altından Mysql Database ve Workbench indirmeliyiz.

-Daha sonra Mysql Workbench üzerinden 'todo' adında bir veritabanı oluşturalım.

Bu ayarlamalardan sonra ;

TodoApp-master > src > main > resources >application.properties içerinden.

    <java
		spring.datasource.url = jdbc:mysql://localhost:3306/todo?useSSL=false
		spring.datasource.username =
		spring.datasource.password =

    ?>

spring.datasource.username ve spring.datasource.password alanlarını Mysql veritabanımızı kurarken kullandığımız kullanıcı adı ve parolayı yazalım.

Bu ayarlamalardan sonra da Java projemizi çalıştıralım.

Java projemiz çalıştıktan sonra frontend projemizi ayağa kaldıralım , bunun için ;

TodoApp-master > app klasörünü kullandığımız geliştirme ortamı ile açalım.

Açtıktan sonra app klasörünün içinde terminal ekranını açarak

`$ sudo npm install ` komutunu çalıştıralım.

Son olarak `$ npm start` komutu ile projemizi kullanmaya başlayabiliriz.


###End
