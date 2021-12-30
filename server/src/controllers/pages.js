import { Sequelize } from "sequelize";
import { Pages } from "../model/pages";
// import { Pages_Projects } from "../model/page_project";

const numOfPage = 10;
export class PagesController{
    async pages(projectId) {
        let pages=await Pages.findAll({
            where:{
                projectId:projectId,
            }
        }); 
        return pages;
    }
     //新建项目
     async createPages(payload) {
        const newPages = await Pages.create({
            pageId: payload.pageId,
            pageText: payload.pageText,
            projectId: payload.projectId,
        });
        return await Pages.findAll({
            where: {
                projectId: payload.projectId,
            },
            order: [[ 'createdAt' ]],
        });
    }
    async deletePages(payload) {
        await Pages.destroy({
            where: {
                pageId:payload.pageId,
                projectId:payload.projectId,
            }
        });
    }
    async updatePages(payload) {
        await Pages.update(
            {
                pageText:payload.pageText,
                // pageImgUrl:payload.pageImgUrl
            },
            {
                where: {
                    pageId:payload.pageId,
                    projectId: payload.projectId,
                }
            }
        );
        return await Pages.findAll({
            where:{
                projectId:payload.projectId,
                pageId: payload.pageId
            }
        })
    }
}   
//     async pages(projectId) {
//         const data = await Pages_Projects.findAll({
//             where: {
//                 projectId:projectId
//             }
//         });

//         let pages = [];
//         for(let i = 0; i < data.length; i ++){
//             pages.push(await Pages.findAll({
//                 where:{
//                     pageId: data[i].pageId,
//                 }
//             }))
//         }
        
//         return pages;
//     }


//     //先读pages-pages表取满足当前projectNo的所有页面No，保存到数组中，再读pages表取pages信息：或者可以直接写到projects-pages表中
//     // async pagesChoose(payload){

//     //     if(payload.wayOfOrder == '1'){
//     //         //按时间默认排序
//     //         order: Sequelize.literal('max(pcreate_time)', 'DESC')
//     //     } else {
//     //         //按项目名称排序
//     //         order: Sequelize.literal('max(pname)', 'DESC')
//     //     }
        

//     //     return await Pages.findAll({
//     //         offset: (payload.page-1) * numOfPage,
//     //         limit: numOfPage
//     //     });
//     // }

   


//     //编辑项目
//     //TODO：图片传递


//     async deletePages(pageId) {
//         await Pages.destroy({
//             where: {
//                 pageId
//             }
//         });
//     }
// }