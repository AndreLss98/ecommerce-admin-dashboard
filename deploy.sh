#!/bin/bash

rm -rf /dist
ng build --prod
gzip -vrk dist/lenofx-dashboard
scp -r -i ~/.ssh/Leno-Key_Pair.pem dist/lenofx-dashboard ubuntu@lenofx-painel:~/