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
        url: [request.original_url, 'http://127.0.0.1:3000'],
        image: asset_url('04_a.png'),
        locale: "ja_JP"
      },
      twitter: {
        site: '@runtecreator',
        card: 'summary',
        image: asset_url('04_a.png')
      },
    }
  end
end
