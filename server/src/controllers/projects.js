import { Sequelize } from "sequelize";
import { Projects } from "../model/projects";
import { Pages } from "../model/pages";

// const numOfPage = 18;
export class ProjectsController{
    
    async projects() {
        // return await this.projectsChoose(payload);
        // order: Sequelize.literal('createdAt', 'DESC')
        return await Projects.findAll({order: [[ 'createdAt', 'DESC' ]],});
    }

    /**
     * 通过提供页码得到需要的项目
     *      pageNum 页码
     *      wayOfOrder 排序方式
     */
    async projectsChoose(payload){
        const username = payload.username;
        if(payload.wayOfOrder == '1'){
            //按时间默认排序
            return await Projects.findAll({
                where: {
                    username: username,
                },
                order: [[ 'createdAt', 'DESC' ]],
            });
        } else {
            //按项目名称排序
            return await Projects.findAll({
                where: {
                    username: username,
                },
                order: [[ 'title', 'DESC' ]],
            });
        }
        

        
    }

    //新建项目
    async createProjects(payload) {
        const newProjects = await Projects.create({
            username: payload.username, 
            title: payload.title,
            img: payload.img,
            desc:payload.desc,     
        });
        return await Projects.findAll({
            where: {
                id: newProjects.id
            }
        });
    }


    //编辑项目
    async updateProjects(payload) {
        await Projects.update(
            {
                title: payload.title,
                desc: payload.desc,
                img: payload.img,
            },
            {
                where: {
                    id:payload.id
                }
            }
        );
        //在更新项目数据后还要返回给前端数据
        return await Projects.findAll({
            where: {
                id: payload.id
            }
        })
    }

    //删除项目
    async deleteProjects(id) {
        await Projects.destroy({
            where: {
                id
            }
        });
        await Pages.destroy({
            where:{
                projectId: id,
            }
        })
        //还要删除项目下的所有页面
    }


    //获得正文
    async getText(id){
        return await Projects.findAll({
            attributes: ['text'],
            where:{
                id:id,
            }
        });
    }

    //更新正文
    // async updateText(payload) {
    //     await Projects.update(
    //         {
    //             text:payload.text,
    //         },
    //         {
    //             where: {
    //                 id:payload.id
    //             }
    //         }
    //     );

    //     return await Projects.findAll({
    //         where: {
    //             id: payload.id
    //         }
    //     })
    // }
}