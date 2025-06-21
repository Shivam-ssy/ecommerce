import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { ShoppingBag, Truck, Shield, RotateCcw, Headphones, Star, ArrowRight, Gift, Zap, Heart } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-800 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=800&width=1200')] bg-cover bg-center opacity-10"></div>

        <div className="relative container mx-auto px-4 py-24 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge className="bg-white/20 text-white border-white/30 hover:bg-white/30">
                  🎉 New Collection Available
                </Badge>
                <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
                  Discover Your
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400">
                    Perfect Style
                  </span>
                </h1>
                <p className="text-xl lg:text-2xl text-blue-100 max-w-lg">
                  Shop the latest trends with unbeatable prices, fast shipping, and exceptional quality.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="text-lg px-8 py-4 bg-white text-blue-600 hover:bg-blue-50">
                  <Link href="/products">
                    <ShoppingBag className="mr-2 h-5 w-5" />
                    Shop Now
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="text-lg px-8 py-4 border-white text-white hover:bg-white hover:text-blue-600"
                >
                  <Link href="/products">
                    Explore Collection
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>

              <div className="flex items-center gap-8 pt-4">
                <div className="text-center">
                  <div className="text-3xl font-bold">10K+</div>
                  <div className="text-blue-200 text-sm">Happy Customers</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold">500+</div>
                  <div className="text-blue-200 text-sm">Products</div>
                </div>
                <div className="text-center">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <div className="text-blue-200 text-sm">4.9 Rating</div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="relative z-10">
                <Image
                  src="/placeholder.svg?height=600&width=500"
                  alt="Featured Products"
                  width={500}
                  height={600}
                  className="rounded-2xl shadow-2xl"
                />
              </div>
              <div className="absolute -top-4 -right-4 w-72 h-72 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full blur-3xl opacity-20"></div>
              <div className="absolute -bottom-4 -left-4 w-72 h-72 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full blur-3xl opacity-20"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Why Choose Our Store?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We're committed to providing you with the best shopping experience possible
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="text-center hover:shadow-lg transition-all duration-300 border-0 shadow-md">
              <CardHeader>
                <div className="mx-auto mb-4 w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                  <Truck className="h-8 w-8 text-blue-600" />
                </div>
                <CardTitle className="text-xl">Free Shipping</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Free shipping on all orders over $50. Fast and reliable delivery to your doorstep.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-all duration-300 border-0 shadow-md">
              <CardHeader>
                <div className="mx-auto mb-4 w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                  <Shield className="h-8 w-8 text-green-600" />
                </div>
                <CardTitle className="text-xl">Secure Payments</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Your payment information is protected with bank-level security and encryption.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-all duration-300 border-0 shadow-md">
              <CardHeader>
                <div className="mx-auto mb-4 w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center">
                  <RotateCcw className="h-8 w-8 text-purple-600" />
                </div>
                <CardTitle className="text-xl">Easy Returns</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  30-day hassle-free returns. Not satisfied? We'll make it right, guaranteed.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-all duration-300 border-0 shadow-md">
              <CardHeader>
                <div className="mx-auto mb-4 w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center">
                  <Headphones className="h-8 w-8 text-orange-600" />
                </div>
                <CardTitle className="text-xl">24/7 Support</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Our friendly customer service team is here to help you anytime, anywhere.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-all duration-300 border-0 shadow-md">
              <CardHeader>
                <div className="mx-auto mb-4 w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                  <Heart className="h-8 w-8 text-red-600" />
                </div>
                <CardTitle className="text-xl">Quality Guarantee</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Premium quality products carefully selected and tested for your satisfaction.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-all duration-300 border-0 shadow-md">
              <CardHeader>
                <div className="mx-auto mb-4 w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center">
                  <Zap className="h-8 w-8 text-yellow-600" />
                </div>
                <CardTitle className="text-xl">Fast Delivery</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Lightning-fast processing and delivery. Most orders ship within 24 hours.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Shop by Category</h2>
            <p className="text-xl text-gray-600">Discover our wide range of premium products</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { name: "Electronics", image: "/placeholder.svg?height=200&width=200", count: "120+ items" },
              { name: "Clothing", image: "/placeholder.svg?height=200&width=200", count: "200+ items" },
              { name: "Home", image: "/placeholder.svg?height=200&width=200", count: "80+ items" },
              { name: "Sports", image: "/placeholder.svg?height=200&width=200", count: "60+ items" },
            ].map((category) => (
              <Link
                key={category.name}
                href={`/products?category=${encodeURIComponent(category.name)}`}
                className="group"
              >
                <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 transform group-hover:-translate-y-2">
                  <div className="relative aspect-square">
                    <Image
                      src={category.image || "/placeholder.svg"}
                      alt={category.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <div className="absolute bottom-4 left-4 text-white">
                      <h3 className="font-bold text-lg">{category.name}</h3>
                      <p className="text-sm text-gray-200">{category.count}</p>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-2xl mx-auto space-y-6">
            <Gift className="h-16 w-16 mx-auto text-yellow-400" />
            <h2 className="text-3xl lg:text-4xl font-bold">Get Exclusive Deals & Updates</h2>
            <p className="text-xl text-blue-100">
              Subscribe to our newsletter and be the first to know about new products, sales, and special offers.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Enter your email address"
                className="bg-white/10 border-white/20 text-white placeholder:text-blue-200 focus:bg-white/20"
              />
              <Button className="bg-white text-blue-600 hover:bg-blue-50 px-8">Subscribe</Button>
            </div>

            <p className="text-sm text-blue-200">Join 10,000+ subscribers. No spam, unsubscribe anytime.</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto space-y-8">
            <h2 className="text-4xl lg:text-5xl font-bold">Ready to Start Shopping?</h2>
            <p className="text-xl text-gray-300">
              Discover thousands of products from top brands with unbeatable prices and exceptional service.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="text-lg px-8 py-4 bg-blue-600 hover:bg-blue-700">
                <Link href="/products">
                  <ShoppingBag className="mr-2 h-5 w-5" />
                  Browse Products
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="text-lg px-8 py-4 border-gray-600 text-gray-300 hover:bg-gray-800"
              >
                <Link href="/admin">Manage Store</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
