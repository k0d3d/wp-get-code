# rm -rf public/app/*
# cp -r ../../react-app/build/* public/app

git add -A
git commit -am "zipped on `date` "
git archive --prefix=pxl-v-cam-app/ -o release/release.zip HEAD
