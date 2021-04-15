#!/bin/bash

rm -rf /dist
ng build --prod --aot --build-optimizer
gzip -vrk dist/lenofx-dashboard
scp -r -i ~/.ssh/Leno-Key_Pair.pem dist/lenofx-dashboard ubuntu@lenofx-painel:~/