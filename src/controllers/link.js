const {link, template, user} = require("../../models");
var crypto = require("crypto");
var uniqueLink = crypto.randomBytes(5).toString("hex");

    exports.addTemplate = async (req, res) => {
        const data = req.body;
        const linkLogo = req.files;
        try {
          const newTemplate = await template.create({
              ...data,
              uniqueLink,
              image: req.files[0].filename,
              userId: req.user.id,
          });
      
          data.title.map(async (item, index) => { await link.create({
              title: data.title[index],
              url: data.url[index],
              logo: linkLogo[index+1].filename,
              templateId: newTemplate.id,
              userId: req.user.id,
          });
        });
          res.send({
            status: "success",
          });
        } catch (error) {
          console.log(error);
          res.send({
            status: "failed",
            message: "Server error",
          });
        }
    };

    exports.getAllLink = async (req, res) => {
      try {
          let data = await link.findAll({
            where: {
              userId: req.user.id,
            },

            include: {
              model: template,
              as: "template",
              attributes: {
                exclude: [ "createdAt", "updatedAt"],
              },
            },
            attributes: {
              exclude: ['createdAt', 'updatedAt', ],
            },
          });
      
          data = JSON.parse(JSON.stringify(data));
      
          data = data.map((data) => {
            return {
              ...data,
              logo: process.env.FILE_PATH + data.logo,
              image: process.env.FILE_PATH + data.image,
            };
          });
      
          res.send({
            status: 'success',
            data:{
              brands : data
            },
          });
        } catch (error) {
          console.log(error);
          res.send({
            status: 'failed',
            message: 'Server Error',
          });
        }
      };

      exports.getIdLink = async (req, res) => {
        const { id } = req.params;
        try {
            let brand = await link.findOne({
              where: {
                id
              },
  
              include: {
                model: template,
                as: "template",
                attributes: {
                  exclude: ["createdAt", "updatedAt"],
                },
              },
              attributes: {
                exclude: ['createdAt', 'updatedAt', ],
              },
            });
      
            brand = JSON.parse(JSON.stringify(brand));
            brand = {
            ...brand,
            logo: process.env.FILE_PATH + brand.logo,
          };
          // brand = JSON.parse(JSON.stringify(brand));
      
          // brand = brand.map((brand) => {
          //   return {
          //     ...brand,
          //     brand: process.env.FILE_PATH + brand.logo,
          //   };
          // });
        
            res.send({
              status: 'success',
              data:{
                brand : brand
              },
            });
          } catch (error) {
            console.log(error);
            res.send({
              status: 'failed',
              message: 'Server Error',
            });
          }
        };

      exports.deleteLink = async (req, res) => {
        try {
            const { id } = req.params
    
            await link.destroy({
                where: {
                    id
                }
            })
    
            res.send({
                data: { id: `${id}` },
                status: 'success',
                message: `Delete link id: ${id} finished`
            })
        } catch (error) {
            console.log(error)
            res.send({
                status: 'failed',
                message: 'Server Error'
            })
        }
    }

    exports.updateLink = async (req, res) => {
      const { id } = req.params;
      const data = req.body;
    
      try {
        let linkData = await link.findOne({
          where: {
            id,
          },
          attributes: {
            exclude: ["id", "templateId", "createdAt", "updatedAt"],
          },
        });
    
        await template.update(
          {
            viewCount: linkData.viewCount + 1,
          },
          { where: { id } }
        );
    
        let templates = await template.findOne({
          where: {
            id,
          },
          attributes: {
            exclude: ["id", "templateId", "createdAt", "updatedAt"],
          },
        });
    
        res.send({
          status: "success",
          message: `Update template with id ${id} finished`,
          data: {
            linkData
          },
        });
      } catch (error) {
        console.log(error);
        res.send({
          status: "failed",
          message: "Server error",
        });
      }
    };

    exports.updateLinkForm = async (req, res) => {
      try {
          const { id } = req.params
          let data = req.body

          data = {
            ...data,
            logo: req.files.logo[0].filename,
          }

          await link.update(data,  {
            where: {
                id
            }
          })

          data = JSON.parse(JSON.stringify(data));
          data = {
          ...data,
          logo: process.env.FILE_PATH + data.logo,
        };
  
          res.send({
              status: 'success',
              message: `Update book id: ${id} finished`,
              data:{
                link : data
              },
          })
      } catch (error) {
          console.log(error)
          res.send({
              status: 'failed',
              message: 'Server Error'
          })
      }
  }