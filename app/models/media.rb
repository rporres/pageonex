class Media < ActiveRecord::Base
	has_many :images
	has_many :media_threadxes
	has_many :threadxes, :through => :media_threadxes

  default_scope where(:working=>true)

  scope :by_country_and_display_name, order("country, display_name") 

  def name_with_country
    self.country + " - " + self.display_name
  end

  def image_directory_name
    self.country_code+"-"+self.name
  end

  def create_image_directory
    return false if not Pageonex::Application.config.use_local_images
    local_image_dir = File.join(KioskoScraper.local_image_dir, self.image_directory_name)
    FileUtils.mkdir local_image_dir unless File.directory? local_image_dir
    true
  end

  def self.from_csv_row row
    m = Media.new
    m.country = row[0]
    m.country_code = row[1]
    m.display_name = row[2]
    m.name = row[3]
    m.url = row[4]
    m
  end

  def to_csv_row
    [ self.country, self.country_code, self.display_name, self.name, self.url ]
  end

end
