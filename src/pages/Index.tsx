import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';

interface VPSProvider {
  id: number;
  name: string;
  logo: string;
  rating: number;
  reviews: number;
  pricePerMonth: number;
  ram: number;
  cpu: number;
  storage: number;
  location: string;
  uptime: number;
  support: string;
  features: string[];
}

const mockProviders: VPSProvider[] = [
  {
    id: 1,
    name: 'DigitalOcean',
    logo: '🌊',
    rating: 4.8,
    reviews: 12453,
    pricePerMonth: 6,
    ram: 1,
    cpu: 1,
    storage: 25,
    location: 'США, Европа, Азия',
    uptime: 99.99,
    support: '24/7',
    features: ['SSD', 'Backup', 'Firewall', 'Monitoring']
  },
  {
    id: 2,
    name: 'Vultr',
    logo: '⚡',
    rating: 4.7,
    reviews: 8932,
    pricePerMonth: 5,
    ram: 1,
    cpu: 1,
    storage: 25,
    location: 'США, Европа, Азия, Австралия',
    uptime: 99.95,
    support: '24/7',
    features: ['SSD', 'DDoS Protection', 'API', 'Snapshots']
  },
  {
    id: 3,
    name: 'Linode',
    logo: '🚀',
    rating: 4.9,
    reviews: 15234,
    pricePerMonth: 5,
    ram: 1,
    cpu: 1,
    storage: 25,
    location: 'США, Европа, Азия',
    uptime: 99.98,
    support: '24/7',
    features: ['SSD', 'Backup', 'Load Balancer', 'Kubernetes']
  },
  {
    id: 4,
    name: 'Hetzner',
    logo: '🔥',
    rating: 4.6,
    reviews: 6721,
    pricePerMonth: 4.5,
    ram: 2,
    cpu: 1,
    storage: 20,
    location: 'Германия, Финляндия, США',
    uptime: 99.9,
    support: 'Business hours',
    features: ['SSD', 'Backup', 'Private Network', 'Cloud Firewall']
  },
  {
    id: 5,
    name: 'AWS Lightsail',
    logo: '☁️',
    rating: 4.5,
    reviews: 9834,
    pricePerMonth: 5,
    ram: 1,
    cpu: 2,
    storage: 40,
    location: 'Глобально',
    uptime: 99.99,
    support: '24/7',
    features: ['SSD', 'CDN', 'DNS', 'Load Balancer']
  },
  {
    id: 6,
    name: 'Contabo',
    logo: '💎',
    rating: 4.3,
    reviews: 4521,
    pricePerMonth: 3.99,
    ram: 4,
    cpu: 2,
    storage: 50,
    location: 'Германия, США, Сингапур',
    uptime: 99.5,
    support: 'Email',
    features: ['SSD', 'DDoS Protection', 'Backup', 'Multiple OS']
  }
];

const Index = () => {
  const [priceRange, setPriceRange] = useState([0, 50]);
  const [ramFilter, setRamFilter] = useState('all');
  const [locationFilter, setLocationFilter] = useState('all');
  const [comparison, setComparison] = useState<number[]>([]);

  const filteredProviders = mockProviders.filter(provider => {
    const priceMatch = provider.pricePerMonth >= priceRange[0] && provider.pricePerMonth <= priceRange[1];
    const ramMatch = ramFilter === 'all' || provider.ram >= parseInt(ramFilter);
    const locationMatch = locationFilter === 'all' || provider.location.includes(locationFilter);
    return priceMatch && ramMatch && locationMatch;
  });

  const toggleComparison = (id: number) => {
    if (comparison.includes(id)) {
      setComparison(comparison.filter(cid => cid !== id));
    } else if (comparison.length < 4) {
      setComparison([...comparison, id]);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-secondary/20 to-background animate-gradient bg-[length:200%_200%]" />
        
        <div className="relative z-10 container mx-auto px-4 py-16">
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="text-5xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
              VPS Рейтинг
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Сравните лучшие VPS-провайдеры мира. Найдите идеальный сервер для вашего проекта
            </p>
          </div>

          <Tabs defaultValue="rating" className="mb-8">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-3">
              <TabsTrigger value="rating">Рейтинг</TabsTrigger>
              <TabsTrigger value="compare">Сравнение</TabsTrigger>
              <TabsTrigger value="reviews">Отзывы</TabsTrigger>
            </TabsList>

            <TabsContent value="rating" className="space-y-8 mt-8">
              <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Icon name="SlidersHorizontal" size={20} />
                  Фильтры
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Цена в месяц: ${priceRange[0]} - ${priceRange[1]}
                    </label>
                    <Slider
                      value={priceRange}
                      onValueChange={setPriceRange}
                      max={50}
                      step={1}
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">RAM (GB)</label>
                    <Select value={ramFilter} onValueChange={setRamFilter}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Все</SelectItem>
                        <SelectItem value="1">1 GB+</SelectItem>
                        <SelectItem value="2">2 GB+</SelectItem>
                        <SelectItem value="4">4 GB+</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Локация</label>
                    <Select value={locationFilter} onValueChange={setLocationFilter}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Все</SelectItem>
                        <SelectItem value="США">США</SelectItem>
                        <SelectItem value="Европа">Европа</SelectItem>
                        <SelectItem value="Азия">Азия</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProviders.map((provider, index) => (
                  <Card
                    key={provider.id}
                    className="group p-6 bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/50 transition-all duration-300 hover:scale-105 animate-scale-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <span className="text-4xl">{provider.logo}</span>
                        <div>
                          <h3 className="font-bold text-lg">{provider.name}</h3>
                          <div className="flex items-center gap-1 mt-1">
                            <Icon name="Star" size={16} className="text-yellow-500 fill-yellow-500" />
                            <span className="font-semibold">{provider.rating}</span>
                            <span className="text-sm text-muted-foreground">({provider.reviews})</span>
                          </div>
                        </div>
                      </div>
                      <Badge variant={comparison.includes(provider.id) ? "default" : "outline"}>
                        #{filteredProviders.indexOf(provider) + 1}
                      </Badge>
                    </div>

                    <div className="space-y-3 mb-4">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">RAM:</span>
                        <span className="font-medium">{provider.ram} GB</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">CPU:</span>
                        <span className="font-medium">{provider.cpu} Core</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Storage:</span>
                        <span className="font-medium">{provider.storage} GB SSD</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Uptime:</span>
                        <Badge variant="secondary">{provider.uptime}%</Badge>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1 mb-4">
                      {provider.features.map(feature => (
                        <Badge key={feature} variant="outline" className="text-xs">
                          {feature}
                        </Badge>
                      ))}
                    </div>

                    <div className="border-t border-border/50 pt-4">
                      <div className="flex items-baseline gap-1 mb-3">
                        <span className="text-3xl font-bold text-primary">${provider.pricePerMonth}</span>
                        <span className="text-muted-foreground">/месяц</span>
                      </div>
                      <div className="flex gap-2">
                        <Button className="flex-1 bg-primary hover:bg-primary/90">
                          Выбрать
                        </Button>
                        <Button
                          variant={comparison.includes(provider.id) ? "default" : "outline"}
                          size="icon"
                          onClick={() => toggleComparison(provider.id)}
                          disabled={!comparison.includes(provider.id) && comparison.length >= 4}
                        >
                          <Icon name={comparison.includes(provider.id) ? "Check" : "GitCompare"} size={18} />
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="compare" className="mt-8">
              {comparison.length === 0 ? (
                <Card className="p-12 text-center bg-card/50 backdrop-blur-sm">
                  <Icon name="GitCompare" size={48} className="mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-xl font-semibold mb-2">Выберите провайдеров для сравнения</h3>
                  <p className="text-muted-foreground">Вы можете сравнить до 4 провайдеров одновременно</p>
                </Card>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left p-4 font-semibold">Параметр</th>
                        {comparison.map(id => {
                          const provider = mockProviders.find(p => p.id === id);
                          return (
                            <th key={id} className="text-center p-4">
                              <div className="flex flex-col items-center gap-2">
                                <span className="text-3xl">{provider?.logo}</span>
                                <span className="font-bold">{provider?.name}</span>
                              </div>
                            </th>
                          );
                        })}
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border/50">
                        <td className="p-4 font-medium">Рейтинг</td>
                        {comparison.map(id => {
                          const provider = mockProviders.find(p => p.id === id);
                          return (
                            <td key={id} className="text-center p-4">
                              <div className="flex items-center justify-center gap-1">
                                <Icon name="Star" size={16} className="text-yellow-500 fill-yellow-500" />
                                <span className="font-semibold">{provider?.rating}</span>
                              </div>
                            </td>
                          );
                        })}
                      </tr>
                      <tr className="border-b border-border/50 bg-muted/20">
                        <td className="p-4 font-medium">Цена/месяц</td>
                        {comparison.map(id => {
                          const provider = mockProviders.find(p => p.id === id);
                          return (
                            <td key={id} className="text-center p-4">
                              <span className="text-2xl font-bold text-primary">${provider?.pricePerMonth}</span>
                            </td>
                          );
                        })}
                      </tr>
                      <tr className="border-b border-border/50">
                        <td className="p-4 font-medium">RAM</td>
                        {comparison.map(id => {
                          const provider = mockProviders.find(p => p.id === id);
                          return <td key={id} className="text-center p-4">{provider?.ram} GB</td>;
                        })}
                      </tr>
                      <tr className="border-b border-border/50 bg-muted/20">
                        <td className="p-4 font-medium">CPU</td>
                        {comparison.map(id => {
                          const provider = mockProviders.find(p => p.id === id);
                          return <td key={id} className="text-center p-4">{provider?.cpu} Core</td>;
                        })}
                      </tr>
                      <tr className="border-b border-border/50">
                        <td className="p-4 font-medium">Storage</td>
                        {comparison.map(id => {
                          const provider = mockProviders.find(p => p.id === id);
                          return <td key={id} className="text-center p-4">{provider?.storage} GB SSD</td>;
                        })}
                      </tr>
                      <tr className="border-b border-border/50 bg-muted/20">
                        <td className="p-4 font-medium">Uptime</td>
                        {comparison.map(id => {
                          const provider = mockProviders.find(p => p.id === id);
                          return <td key={id} className="text-center p-4">{provider?.uptime}%</td>;
                        })}
                      </tr>
                      <tr className="border-b border-border/50">
                        <td className="p-4 font-medium">Локации</td>
                        {comparison.map(id => {
                          const provider = mockProviders.find(p => p.id === id);
                          return <td key={id} className="text-center p-4 text-sm">{provider?.location}</td>;
                        })}
                      </tr>
                      <tr className="border-b border-border/50 bg-muted/20">
                        <td className="p-4 font-medium">Поддержка</td>
                        {comparison.map(id => {
                          const provider = mockProviders.find(p => p.id === id);
                          return <td key={id} className="text-center p-4">{provider?.support}</td>;
                        })}
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}
            </TabsContent>

            <TabsContent value="reviews" className="mt-8">
              <div className="space-y-4">
                {[
                  { user: 'Алексей М.', provider: 'DigitalOcean', rating: 5, text: 'Отличный сервис! Быстрая настройка и стабильная работа', date: '15 ноября 2024' },
                  { user: 'Мария К.', provider: 'Linode', rating: 5, text: 'Использую уже 2 года, ни разу не подвела. Поддержка отзывчивая', date: '12 ноября 2024' },
                  { user: 'Дмитрий С.', provider: 'Vultr', rating: 4, text: 'Хорошее соотношение цены и качества. Иногда бывают небольшие задержки', date: '10 ноября 2024' },
                  { user: 'Елена В.', provider: 'Hetzner', rating: 5, text: 'Самые доступные цены в Европе при отличном качестве!', date: '8 ноября 2024' },
                ].map((review, index) => (
                  <Card key={index} className="p-6 bg-card/50 backdrop-blur-sm animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold">
                          {review.user[0]}
                        </div>
                        <div>
                          <div className="font-semibold">{review.user}</div>
                          <div className="text-sm text-muted-foreground">{review.provider}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        {Array.from({ length: review.rating }).map((_, i) => (
                          <Icon key={i} name="Star" size={16} className="text-yellow-500 fill-yellow-500" />
                        ))}
                      </div>
                    </div>
                    <p className="text-foreground mb-2">{review.text}</p>
                    <div className="text-xs text-muted-foreground">{review.date}</div>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Index;
