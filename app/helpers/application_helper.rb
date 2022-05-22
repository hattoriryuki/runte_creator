module ApplicationHelper
  def flash_class(type)
    { danger: 'red', notice: 'green' }.fetch(type.to_sym)
  end

  def default_meta_tags
    {
      title: 'RunteCreator',
      description: '勉強で行き詰まった時にらんてくんを描いて、やすらぎと笑いを与え、現実逃避できるサービスです',
      keywords: 'らんてくん, お絵描き, RUNTEQ',
      charset: 'UTF-8',
      og: {
        title: 'RunteCreator',
        description: 'RunteCreator',
        type: 'website',
        url: [request.original_url],
        image: asset_url('ogp_default.png'),
        locale: "ja_JP"
      },
      twitter: {
        site: '@runtecreator',
        card: 'summary_large_image',
        image: asset_url('ogp_default.png')
      },
    }
  end
end
