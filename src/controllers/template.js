const {link, template, user} = require("../../models");

exports.getIdTemplate = async (req, res) => {
    const { id } = req.params;
    try {
        let brand = await template.findOne({
            where: {
              id
            },

            include: {
              model: link,
              as: "links",
              attributes: {
                exclude: ["createdAt", "updatedAt"],
              },
            },
            attributes: {
              exclude: ['createdAt', 'updatedAt', ],
            },
          });
    
        res.send({
            status: "success",
            data: brand
            
            ,
        });
        } catch (error) {
        console.log(error);
        res.send({
            status: "failed",
            message: "Server error",
        });
        }
    };

    exports.updateViewCount = async (req, res) => {
      const { id } = req.params;
    
      try {
        let updateView = await template.findOne({
          where: {
            id,
          },
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
        });
    
        await template.update(
          {
            viewCount: updateView.viewCount + 1,
          },
          { where: { id } }
        );
    
        let brand = await template.findOne({
          where: {
            id,
          },
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
        });
    
        res.send({
          status: "success",
          message: `Update brand with id ${id} finished`,
          data: {
            viewCount: brand.viewCount,
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