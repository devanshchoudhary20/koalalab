export default function TeamSection() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-primary-text_blue text-center mb-12">
          Our Team
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Team member cards would go here */}
          <div className="text-center">
            <div className="w-32 h-32 bg-gray-300 rounded-full mx-auto mb-4"></div>
            <h3 className="text-xl font-semibold">Team Member 1</h3>
            <p className="text-primary-text_gray">Role</p>
          </div>
        </div>
      </div>
    </section>
  );
}
