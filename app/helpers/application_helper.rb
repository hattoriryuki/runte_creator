module ApplicationHelper
  def flash_class(type)
    { danger: 'red', notice: 'green' }.fetch(type.to_sym)
  end

  # def default_meta_tags
  #   {
  #     title: '勉強で行き詰まった時にらんてくんを描いて、やすらぎと笑いを与え、現実逃避できるサービスです',
  #     description: '勉強で行き詰まった時にらんてくんを描いて、やすらぎと笑いを与え、現実逃避できるサービスです',
  #     keywords: 'らんてくん, お絵描き, プログラミング初学者, RUNTEQ',
  #     charset: 'UTF-8',
  #     og: {
  #       title: 'RunteCreator',
  #       description: 'RunteCreator',
  #       type: 'website',
  #       url: [request.original_url, 'http://127.0.0.1:3000'],
  #       image: asset_url('04_a.png'),
  #       locale: "ja_JP"
  #     },
  #     twitter: {
  #       site: '@runtecreator',
  #       card: 'summary_large_image',
  #       image: asset_url('04_a.png')
  #     },
  #   }
  # end

  def get_twitter_card_info(page)
    twitter_card = {}
    if page
      twitter_card[:url] = page.url
      twitter_card[:title] = 'RunteCreator'
      twitter_card[:description] = '勉強で行き詰まった時にらんてくんを描いて、やすらぎと笑いを与え、現実逃避できるサービスです'
      twitter_card[:image] = set_page_img(page.image_src)
    else
      twitter_card[:url] = 'https://runte-creator.herokuapp.com/'
      twitter_card[:title] = 'RunteCreator'
      twitter_card[:description] = '勉強で行き詰まった時にらんてくんを描いて、やすらぎと笑いを与え、現実逃避できるサービスです'
      twitter_card[:image] = asset_url('runtekun_01.png')
    end
    twitter_card[:card] = 'summary'
    twitter_card[:site] = '@runte_creator'
    twitter_card
  end 
end
