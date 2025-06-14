
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { HelpCircle } from "lucide-react";

const FAQs = () => {
  const faqs = [
    {
      question: "How does AI-powered credit scoring work?",
      answer: "Our AI analyzes alternative data sources including mobile phone usage, social media activity, utility payments, and other non-traditional financial indicators to create a comprehensive credit profile. This helps assess creditworthiness for individuals without traditional credit history."
    },
    {
      question: "Is my data secure and private?",
      answer: "Yes, we use bank-grade encryption and comply with international privacy standards including GDPR. Your data is never shared with third parties without your explicit consent, and we employ advanced security measures to protect your information."
    },
    {
      question: "Who can benefit from alternative credit scoring?",
      answer: "Anyone without traditional credit history can benefit, including young adults, immigrants, entrepreneurs, people in developing countries, and those who have been excluded from traditional banking systems."
    },
    {
      question: "How accurate are the credit scores?",
      answer: "Our AI-powered system achieves 95% accuracy by analyzing over 50 alternative data points. The system continuously learns and improves its predictions through machine learning algorithms."
    },
    {
      question: "How long does it take to get a credit score?",
      answer: "Credit scores are generated in real-time, typically within seconds of submitting your information. Our 24/7 processing ensures you can access your score anytime."
    },
    {
      question: "Can I improve my alternative credit score?",
      answer: "Yes! By maintaining consistent payment patterns, engaging positively with digital platforms, and building a stable financial behavior pattern, you can improve your alternative credit score over time."
    },
    {
      question: "What data sources do you use?",
      answer: "We analyze mobile phone usage patterns, utility bill payments, social media behavior, e-commerce activity, educational background, employment history, and other alternative data sources while maintaining strict privacy standards."
    },
    {
      question: "Is there a cost to use the service?",
      answer: "We offer a free basic credit score check. Premium features including detailed reports, score monitoring, and personalized improvement recommendations are available through our subscription plans."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-blue-50">
      <Navbar />
      
      <div className="pt-20 pb-16 px-4">
        <div className="container mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <div className="flex justify-center mb-6">
              <HelpCircle className="h-16 w-16 text-orange-600" />
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-orange-600 to-blue-600 bg-clip-text text-transparent mb-6">
              Frequently Asked Questions
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Get answers to common questions about our AI-powered alternative credit scoring platform.
            </p>
          </div>

          {/* FAQ Section */}
          <div className="max-w-4xl mx-auto">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl text-center">Common Questions</CardTitle>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  {faqs.map((faq, index) => (
                    <AccordionItem key={index} value={`item-${index}`}>
                      <AccordionTrigger className="text-left text-lg font-medium">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-gray-600 text-base leading-relaxed">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          </div>

          {/* Contact Section */}
          <div className="text-center mt-16">
            <h2 className="text-3xl font-bold mb-4">Still have questions?</h2>
            <p className="text-xl text-gray-600 mb-8">
              Our support team is here to help you with any additional questions.
            </p>
            <a
              href="/contact"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-orange-500 to-blue-600 text-white font-semibold rounded-lg hover:from-orange-600 hover:to-blue-700 transition-all duration-300"
            >
              Contact Support
            </a>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default FAQs;
