# nginx镜像
FROM nginx:1.15.3-alpine
# 维护者信息
MAINTAINER songjichao "jichaosong@outlook.com"

WORKDIR /app

COPY . /app

RUN rm /etc/nginx/conf.d/default.conf

COPY nginx/default.conf /etc/nginx/conf.d
# 拷贝前端vue项目打包后生成的文件到nginx下运行
COPY dist/ /usr/share/nginx/html

# 暴露8101端口
EXPOSE 9528

# 注：CMD不同于RUN，CMD用于指定在容器启动时所要执行的命令，而RUN用于指定镜像构建时所要执行的命令。
#    RUN指令创建的中间镜像会被缓存，并会在下次构建中使用。如果不想使用这些缓存镜像，可以在构建时指定--no-cache参数，如：docker build --no-cache

# 使用daemon off的方式将nginx运行在前台保证镜像不至于退出
CMD ["nginx", "-g", "daemon off;"]